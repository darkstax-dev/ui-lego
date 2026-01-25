import { TopologyConfig, TopologyConfigFile } from '@/types/config';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private currentConfig: TopologyConfig | null = null;

  private constructor() {}

  static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  async loadFromFile(file: File): Promise<TopologyConfig> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const configData = JSON.parse(e.target?.result as string);
          const validated = this.validateConfig(configData);
          this.currentConfig = validated;
          resolve(validated);
        } catch (error) {
          reject(new Error(`Invalid configuration file: ${error}`));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read configuration file'));
      reader.readAsText(file);
    });
  }

  loadFromObject(config: TopologyConfigFile): TopologyConfig {
    const validated = this.validateConfig(config);
    this.currentConfig = validated;
    return validated;
  }

  loadFromJSON(jsonString: string): TopologyConfig {
    try {
      const configData = JSON.parse(jsonString);
      return this.loadFromObject(configData);
    } catch (error) {
      throw new Error(`Invalid JSON: ${error}`);
    }
  }

  getCurrentConfig(): TopologyConfig | null {
    return this.currentConfig;
  }

  private validateConfig(config: any): TopologyConfig {
    if (!config.metadata) {
      throw new Error('Configuration must include metadata');
    }

    if (!config.metadata.name) {
      throw new Error('Configuration metadata must include a name');
    }

    if (!config.nodeTypes || typeof config.nodeTypes !== 'object') {
      throw new Error('Configuration must include nodeTypes object');
    }

    if (!config.edgeTypes || typeof config.edgeTypes !== 'object') {
      throw new Error('Configuration must include edgeTypes object');
    }

    if (Object.keys(config.nodeTypes).length === 0) {
      throw new Error('Configuration must define at least one node type');
    }

    if (Object.keys(config.edgeTypes).length === 0) {
      throw new Error('Configuration must define at least one edge type');
    }

    for (const [nodeType, nodeConfig] of Object.entries(config.nodeTypes)) {
      if (!nodeConfig || typeof nodeConfig !== 'object') {
        throw new Error(`Invalid configuration for node type: ${nodeType}`);
      }
      const nc = nodeConfig as any;
      if (!nc.label || !nc.icon || !nc.color) {
        throw new Error(`Node type ${nodeType} must have label, icon, and color`);
      }
    }

    for (const [edgeType, edgeConfig] of Object.entries(config.edgeTypes)) {
      if (!edgeConfig || typeof edgeConfig !== 'object') {
        throw new Error(`Invalid configuration for edge type: ${edgeType}`);
      }
      const ec = edgeConfig as any;
      if (!ec.label || !ec.color) {
        throw new Error(`Edge type ${edgeType} must have label and color`);
      }
    }

    return config as TopologyConfig;
  }

  exportConfig(): string {
    if (!this.currentConfig) {
      throw new Error('No configuration loaded');
    }
    return JSON.stringify(this.currentConfig, null, 2);
  }

  mergeConfig(partialConfig: Partial<TopologyConfig>): TopologyConfig {
    if (!this.currentConfig) {
      throw new Error('No base configuration loaded');
    }

    const merged = {
      ...this.currentConfig,
      ...partialConfig,
      nodeTypes: {
        ...this.currentConfig.nodeTypes,
        ...(partialConfig.nodeTypes || {}),
      },
      edgeTypes: {
        ...this.currentConfig.edgeTypes,
        ...(partialConfig.edgeTypes || {}),
      },
      theme: {
        ...this.currentConfig.theme,
        ...(partialConfig.theme || {}),
      },
      layout: {
        ...this.currentConfig.layout,
        ...(partialConfig.layout || {}),
      },
      features: {
        ...this.currentConfig.features,
        ...(partialConfig.features || {}),
      },
    };

    this.currentConfig = merged;
    return merged;
  }
}
