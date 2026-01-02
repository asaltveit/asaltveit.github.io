import { 
  Code2, 
  Database, 
  Globe, 
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

// Map tech names to icons
const techIconMap: Record<string, React.ReactNode> = {
  // Frontend
  'React': <Code2 className="w-5 h-5" />,
  'Next.js': <Code2 className="w-5 h-5" />,
  'TypeScript': <FileCode className="w-5 h-5" />,
  'JavaScript': <FileCode className="w-5 h-5" />,
  'TailwindCSS': <Layers className="w-5 h-5" />,
  'Material UI': <Package className="w-5 h-5" />,
  'Zustand': <Package className="w-5 h-5" />,
  'Observable Plot': <Layers className="w-5 h-5" />,
  'HTML': <FileCode className="w-5 h-5" />,
  'CSS': <Layers className="w-5 h-5" />,
  'Vitest': <Zap className="w-5 h-5" />,
  'Vue': <Code2 className="w-5 h-5" />,
  // Backend
  'Python': <Terminal className="w-5 h-5" />,
  'Supabase': <Database className="w-5 h-5" />,
  'Node.js': <Server className="w-5 h-5" />,
  'Express.js': <Server className="w-5 h-5" />,
  'Sequelize.js': <Database className="w-5 h-5" />,
  'PostgreSQL': <Database className="w-5 h-5" />,
  // AI Tools
  'ElevenLabs': <Mic className="w-5 h-5" />,
  'Tavus': <Mic className="w-5 h-5" />,
  'Otter.ai': <Mic className="w-5 h-5" />,
  'Anthropic': <Brain className="w-5 h-5" />,
  'Cursor AI': <Bot className="w-5 h-5" />,
  'fal': <Sparkles className="w-5 h-5" />,
  'Black Forest (Flux)': <ImageIcon className="w-5 h-5" />,
  'n8n': <Sparkles className="w-5 h-5" />,
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
        const icon = techIconMap[tech] || (isAITool ? <Brain className="w-5 h-5" /> : <Code2 className="w-5 h-5" />);
        return (
          <div
            key={tech}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300 text-sm font-medium"
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

