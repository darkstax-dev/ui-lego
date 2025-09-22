import React, { forwardRef, useMemo } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import type * as MonacoTypes from 'monaco-editor';
import './MonacoEditor.css';

export type MonacoEditorTheme = 'light' | 'dark';
export type MonacoEditorLanguage =
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'html'
  | 'css'
  | 'scss'
  | 'less'
  | 'python'
  | 'java'
  | 'csharp'
  | 'cpp'
  | 'c'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'dart'
  | 'scala'
  | 'sql'
  | 'xml'
  | 'yaml'
  | 'markdown'
  | 'plaintext';

export interface MonacoEditorProps {
  value?: string;
  defaultValue?: string;
  language?: MonacoEditorLanguage;
  theme?: MonacoEditorTheme;
  height?: string | number;
  width?: string | number;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  fontSize?: number;
  tabSize?: number;
  wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
  onChange?: (value: string | undefined, event: MonacoTypes.editor.IModelContentChangedEvent) => void;
  onMount?: (editor: MonacoTypes.editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onValidate?: (markers: MonacoTypes.editor.IMarker[]) => void;
  options?: MonacoTypes.editor.IStandaloneEditorConstructionOptions;
}

const MonacoEditor = forwardRef<HTMLDivElement, MonacoEditorProps>(function MonacoEditor({
  value,
  defaultValue,
  language = 'javascript',
  theme = 'light',
  height = 400,
  width = '100%',
  readOnly = false,
  className = '',
  showLineNumbers = true,
  showMinimap = true,
  fontSize = 14,
  tabSize = 2,
  wordWrap = 'on',
  onChange,
  onMount,
  onValidate,
  options = {},
  ...props
}, ref) {
  // Map our theme names to Monaco theme names (custom names to avoid conflicts)
  const monacoTheme = useMemo(() => {
    switch (theme) {
      case 'dark':
        return 'sds-dark';
      case 'light':
      default:
        return 'sds-light';
    }
  }, [theme]);

  // Utilities to resolve CSS variables to hex strings for Monaco theme colors
  function rgbToHex(r: number, g: number, b: number, a?: number): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const rHex = toHex(Math.round(r));
    const gHex = toHex(Math.round(g));
    const bHex = toHex(Math.round(b));
    if (typeof a === 'number' && !Number.isNaN(a)) {
      const aHex = toHex(Math.round(a * 255));
      return `#${rHex}${gHex}${bHex}${aHex}`;
    }
    return `#${rHex}${gHex}${bHex}`;
  }

  function normalizeColorToHex(input: string): string | null {
    if (!input) return null;
    const c = input.trim();
    // If already hex
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c)) return c;
    // rgb() or rgba()
    const rgbMatch = c.match(/^rgba?\(([^)]+)\)$/);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(',').map((v) => v.trim());
      const [r, g, b] = parts.slice(0, 3).map((v) => Number(v));
      const a = parts[3] !== undefined ? Number(parts[3]) : undefined;
      if ([r, g, b].every((n) => Number.isFinite(n))) return rgbToHex(r, g, b, a);
    }
    // Named colors or others are not supported by Monaco theme; return null
    return null;
  }

  function getCssVarHex(varName: string, fallbackHex: string): string {
    if (typeof window === 'undefined' || typeof document === 'undefined') return fallbackHex;
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    const hex = normalizeColorToHex(raw);
    return hex ?? fallbackHex;
  }

  // Define custom Monaco themes before the editor mounts
  const handleBeforeMount = (monaco: Monaco) => {
    const lightColors = {
      background: getCssVarHex('--surface-default', '#ECECEC'),
      foreground: getCssVarHex('--text-blue-main', '#00112B'),
      lineHighlight: getCssVarHex('--surface-subtle', '#F8F9FA'),
      // #0072FF with ~20% alpha
      selection: '#0072FF33',
      cursor: getCssVarHex('--text-blue-main', '#00112B'),
      whitespace: getCssVarHex('--text-gray-disabled', '#CECECE'),
      lineNumber: getCssVarHex('--text-gray-secondary', '#ADADAD'),
      lineNumberActive: getCssVarHex('--text-blue-main', '#00112B'),
      widgetBg: getCssVarHex('--surface-card', '#DFDFDF'),
      widgetBorder: getCssVarHex('--border-subtle', '#E9ECEF'),
      scrollbar: getCssVarHex('--sds-color-black-200', '#1A1A1A'),
      scrollbarHover: getCssVarHex('--sds-color-black-400', '#666666'),
    } as const;

    monaco.editor.defineTheme('sds-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '757575' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: '008000' },
        { token: 'number', foreground: 'FF6600' },
      ],
      colors: {
        'editor.background': lightColors.background,
        'editor.foreground': lightColors.foreground,
        'editor.lineHighlightBackground': lightColors.lineHighlight,
        'editor.selectionBackground': lightColors.selection,
        'editorCursor.foreground': lightColors.cursor,
        'editorWhitespace.foreground': lightColors.whitespace,
        'editorLineNumber.foreground': lightColors.lineNumber,
        'editorLineNumber.activeForeground': lightColors.lineNumberActive,
        'editorWidget.background': lightColors.widgetBg,
        'editorWidget.border': lightColors.widgetBorder,
        'editorSuggestWidget.background': lightColors.widgetBg,
        'editorSuggestWidget.border': lightColors.widgetBorder,
        'editorSuggestWidget.selectedBackground': lightColors.lineHighlight,
        'scrollbar.shadow': lightColors.scrollbar,
        'scrollbarSlider.background': lightColors.scrollbar,
        'scrollbarSlider.hoverBackground': lightColors.scrollbarHover,
        'scrollbarSlider.activeBackground': lightColors.scrollbarHover,
      },
    });

    const darkColors = {
      background: getCssVarHex('--surface-default', '#071F42'),
      foreground: getCssVarHex('--text-white-main', '#ECECEC'),
      lineHighlight: getCssVarHex('--surface-subtle', '#0B254D'),
      // white with ~20% alpha
      selection: '#FFFFFF33',
      cursor: getCssVarHex('--text-white-main', '#ECECEC'),
      whitespace: getCssVarHex('--text-white-tertiary', '#A3AAB1'),
      lineNumber: getCssVarHex('--text-white-tertiary', '#A3AAB1'),
      lineNumberActive: getCssVarHex('--text-white-main', '#ECECEC'),
      widgetBg: getCssVarHex('--surface-card', '#00112B'),
      widgetBorder: getCssVarHex('--border-subtle', '#072B56'),
      scrollbar: getCssVarHex('--sds-color-black-200', '#2A2A2A'),
      scrollbarHover: getCssVarHex('--sds-color-black-400', '#666666'),
    } as const;

    monaco.editor.defineTheme('sds-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': darkColors.background,
        'editor.foreground': darkColors.foreground,
        'editor.lineHighlightBackground': darkColors.lineHighlight,
        'editor.selectionBackground': darkColors.selection,
        'editorCursor.foreground': darkColors.cursor,
        'editorWhitespace.foreground': darkColors.whitespace,
        'editorLineNumber.foreground': darkColors.lineNumber,
        'editorLineNumber.activeForeground': darkColors.lineNumberActive,
        'editorWidget.background': darkColors.widgetBg,
        'editorWidget.border': darkColors.widgetBorder,
        'editorSuggestWidget.background': darkColors.widgetBg,
        'editorSuggestWidget.border': darkColors.widgetBorder,
        'editorSuggestWidget.selectedBackground': darkColors.lineHighlight,
        'scrollbar.shadow': darkColors.scrollbar,
        'scrollbarSlider.background': darkColors.scrollbar,
        'scrollbarSlider.hoverBackground': darkColors.scrollbarHover,
        'scrollbarSlider.activeBackground': darkColors.scrollbarHover,
      },
    });
  };

  const handleEditorDidMount = (editor: MonacoTypes.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    // Call the user's onMount callback if provided
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  // Merge default options with user options
  const editorOptions: MonacoTypes.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: showMinimap },
    lineNumbers: showLineNumbers ? 'on' : 'off',
    fontSize,
    tabSize,
    wordWrap,
    readOnly,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    renderWhitespace: 'selection',
    renderLineHighlight: 'line',
    // Use a concrete font stack; Monaco options do not support CSS variables
    fontFamily: 'Roboto Mono, Fira Code, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontLigatures: true,
    smoothScrolling: true,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: 'on',
    contextmenu: true,
    mouseWheelZoom: true,
    multiCursorModifier: 'ctrlCmd',
    wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
    ...options,
  };

  return (
    <div ref={ref} className={`monaco-editor ${className}`} {...props}>
      <Editor
        value={value}
        defaultValue={defaultValue}
        language={language}
        theme={monacoTheme}
        height={height}
        width={width}
        beforeMount={handleBeforeMount}
        options={editorOptions}
        onChange={onChange}
        onMount={handleEditorDidMount}
        onValidate={onValidate}
        loading={
          <div className="monaco-editor__loading">
            <div className="monaco-editor__loading-spinner"></div>
            <span className="body-base-macan-book">Loading editor...</span>
          </div>
        }
      />
    </div>
  );
});

MonacoEditor.displayName = 'MonacoEditor';

export default MonacoEditor;
