import { 
  Code2, 
  Database, 
  Layers, 
  Package, 
  Server, 
  Terminal,
  FileCode,
  Zap,
  Brain,
  Sparkles,
  Bot,
  Mic,
  Image as ImageIcon
} from 'lucide-react';

interface TechStackIconsProps {
  techStack: string[];
}

const ICON_MD_CLASS = 'w-5 h-5';

// Map tech names to icons
const techIconMap: Record<string, React.ReactNode> = {
  // Frontend
  'React': <Code2 className={ICON_MD_CLASS} />,
  'Next.js': <Code2 className={ICON_MD_CLASS} />,
  'TypeScript': <FileCode className={ICON_MD_CLASS} />,
  'JavaScript': <FileCode className={ICON_MD_CLASS} />,
  'TailwindCSS': <Layers className={ICON_MD_CLASS} />,
  'Material UI': <Package className={ICON_MD_CLASS} />,
  'Zustand': <Package className={ICON_MD_CLASS} />,
  'Observable Plot': <Layers className={ICON_MD_CLASS} />,
  'HTML': <FileCode className={ICON_MD_CLASS} />,
  'CSS': <Layers className={ICON_MD_CLASS} />,
  'Vitest': <Zap className={ICON_MD_CLASS} />,
  'Vue': <Code2 className={ICON_MD_CLASS} />,
  // Backend
  'Python': <Terminal className={ICON_MD_CLASS} />,
  'Supabase': <Database className={ICON_MD_CLASS} />,
  'Node.js': <Server className={ICON_MD_CLASS} />,
  'Express.js': <Server className={ICON_MD_CLASS} />,
  'Sequelize.js': <Database className={ICON_MD_CLASS} />,
  'PostgreSQL': <Database className={ICON_MD_CLASS} />,
  // AI Tools
  'ElevenLabs': <Mic className={ICON_MD_CLASS} />,
  'Tavus': <Mic className={ICON_MD_CLASS} />,
  'Otter.ai': <Mic className={ICON_MD_CLASS} />,
  'Anthropic': <Brain className={ICON_MD_CLASS} />,
  'Cursor AI': <Bot className={ICON_MD_CLASS} />,
  'fal': <Sparkles className={ICON_MD_CLASS} />,
  'Black Forest (Flux)': <ImageIcon className={ICON_MD_CLASS} />,
  'n8n': <Sparkles className={ICON_MD_CLASS} />,
};

export default function TechStackIcons({ techStack }: TechStackIconsProps) {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => {
        // Default to Brain icon for AI tools that aren't explicitly mapped
        const isAITool = tech.toLowerCase().includes('ai') || 
                         tech.toLowerCase().includes('anthropic') ||
                         tech.toLowerCase().includes('elevenlabs') ||
                         tech.toLowerCase().includes('cursor') ||
                         tech.toLowerCase().includes('fal') ||
                         tech.toLowerCase().includes('flux') ||
                         tech.toLowerCase().includes('otter');
        const icon = techIconMap[tech] || (isAITool ? <Brain className={ICON_MD_CLASS} /> : <Code2 className={ICON_MD_CLASS} />);
        return (
          <div
            key={tech}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-hover rounded-md text-text-primary text-sm font-medium"
            title={tech}
          >
            {icon}
            <span className="text-xs">{tech}</span>
          </div>
        );
      })}
    </div>
  );
}

