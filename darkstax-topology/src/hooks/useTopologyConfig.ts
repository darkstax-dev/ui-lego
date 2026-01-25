import { useState, useEffect } from 'react';
import { TopologyConfig } from '@/types/config';
import { ConfigLoader } from '@/lib/config/ConfigLoader';

export function useTopologyConfig(initialConfig?: TopologyConfig) {
  const [config, setConfig] = useState<TopologyConfig | null>(initialConfig || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configLoader = ConfigLoader.getInstance();

  useEffect(() => {
    if (initialConfig) {
      try {
        const validated = configLoader.loadFromObject(initialConfig);
        setConfig(validated);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load configuration');
      }
    }
  }, [initialConfig]);

  const loadFromFile = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const loadedConfig = await configLoader.loadFromFile(file);
      setConfig(loadedConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load configuration file');
    } finally {
      setLoading(false);
    }
  };

  const loadFromJSON = (jsonString: string) => {
    setLoading(true);
    setError(null);
    try {
      const loadedConfig = configLoader.loadFromJSON(jsonString);
      setConfig(loadedConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse JSON configuration');
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (partialConfig: Partial<TopologyConfig>) => {
    try {
      const merged = configLoader.mergeConfig(partialConfig);
      setConfig(merged);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
    }
  };

  const exportConfig = (): string | null => {
    try {
      return configLoader.exportConfig();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export configuration');
      return null;
    }
  };

  return {
    config,
    loading,
    error,
    loadFromFile,
    loadFromJSON,
    updateConfig,
    exportConfig,
  };
}
