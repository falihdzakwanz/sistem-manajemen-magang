import {
    BarChart3,
    Book,
    Bot,
    Briefcase,
    Building2,
    Camera,
    CheckCircle,
    Clock,
    Code,
    Cpu,
    Database,
    Edit,
    FileText,
    Globe,
    Hand,
    Headphones,
    Heart,
    Image,
    Lightbulb,
    Link,
    Mail,
    Megaphone,
    Monitor,
    Phone,
    Rocket,
    Server,
    Shield,
    Smartphone,
    Smile,
    Star,
    Target,
    Trash2,
    Trophy,
    Tv,
    User,
    Users,
    Wifi,
    X,
    Zap,
} from 'lucide-react';
import React from 'react';

// Icon mapping function to convert string values to Lucide React icons
export const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        megaphone: Megaphone,
        monitor: Monitor,
        database: Database,
        shield: Shield,
        building2: Building2,
        globe: Globe,
        wifi: Wifi,
        smartphone: Smartphone,
        phone: Phone,
        camera: Camera,
        headphones: Headphones,
        tv: Tv,
        server: Server,
        code: Code,
        heart: Heart,
        star: Star,
        briefcase: Briefcase,
        book: Book,
        trophy: Trophy,
        lightbulb: Lightbulb,
        zap: Zap,
        target: Target,
        users: Users,
        rocket: Rocket,
        barchart3: BarChart3,
        user: User,
        mail: Mail,
        clock: Clock,
        x: X,
        checkcircle: CheckCircle,
        edit: Edit,
        filetext: FileText,
        image: Image,
        trash2: Trash2,
        hand: Hand,
        smile: Smile,
        bot: Bot,
        cpu: Cpu,
        link: Link,
    };

    return iconMap[iconName.toLowerCase()] || Building2; // Default to Building2 if icon not found
};

// Available icons for the icon picker
export const availableIcons = [
    { key: 'megaphone', label: 'Megaphone', component: Megaphone },
    { key: 'monitor', label: 'Monitor', component: Monitor },
    { key: 'database', label: 'Database', component: Database },
    { key: 'shield', label: 'Shield', component: Shield },
    { key: 'building2', label: 'Building', component: Building2 },
    { key: 'globe', label: 'Globe', component: Globe },
    { key: 'wifi', label: 'Wifi', component: Wifi },
    { key: 'smartphone', label: 'Smartphone', component: Smartphone },
    { key: 'phone', label: 'Phone', component: Phone },
    { key: 'camera', label: 'Camera', component: Camera },
    { key: 'headphones', label: 'Headphones', component: Headphones },
    { key: 'tv', label: 'TV', component: Tv },
    { key: 'server', label: 'Server', component: Server },
    { key: 'code', label: 'Code', component: Code },
    { key: 'heart', label: 'Heart', component: Heart },
    { key: 'star', label: 'Star', component: Star },
    { key: 'briefcase', label: 'Briefcase', component: Briefcase },
    { key: 'book', label: 'Book', component: Book },
    { key: 'trophy', label: 'Trophy', component: Trophy },
    { key: 'lightbulb', label: 'Lightbulb', component: Lightbulb },
    { key: 'zap', label: 'Zap', component: Zap },
    { key: 'target', label: 'Target', component: Target },
    { key: 'users', label: 'Users', component: Users },
    { key: 'rocket', label: 'Rocket', component: Rocket },
    { key: 'barchart3', label: 'Bar Chart', component: BarChart3 },
    { key: 'user', label: 'User', component: User },
    { key: 'mail', label: 'Mail', component: Mail },
    { key: 'clock', label: 'Clock', component: Clock },
    { key: 'x', label: 'Close', component: X },
    { key: 'checkcircle', label: 'Check Circle', component: CheckCircle },
    { key: 'edit', label: 'Edit', component: Edit },
    { key: 'filetext', label: 'File Text', component: FileText },
    { key: 'image', label: 'Image', component: Image },
    { key: 'trash2', label: 'Trash', component: Trash2 },
    { key: 'hand', label: 'Hand', component: Hand },
    { key: 'smile', label: 'Smile', component: Smile },
    { key: 'bot', label: 'Bot', component: Bot },
    { key: 'cpu', label: 'CPU', component: Cpu },
    { key: 'link', label: 'Link', component: Link },
];

// Icon display component
interface IconDisplayProps {
    iconName: string;
    className?: string;
}

export const IconDisplay: React.FC<IconDisplayProps> = ({ iconName, className = 'h-6 w-6' }) => {
    const IconComponent = getIconComponent(iconName);
    return <IconComponent className={className} />;
};

// Icon picker component
interface IconPickerProps {
    selectedIcon: string;
    onIconSelect: (iconKey: string) => void;
    className?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
    selectedIcon,
    onIconSelect,
    className = 'grid grid-cols-6 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-xl p-3',
}) => {
    return (
        <div className={className}>
            {availableIcons.map((icon) => (
                <button
                    key={icon.key}
                    type="button"
                    onClick={() => onIconSelect(icon.key)}
                    className={`flex items-center justify-center rounded-lg border-2 p-2 transition-all hover:bg-gray-50 ${
                        selectedIcon === icon.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    title={icon.label}
                >
                    <icon.component className={`h-5 w-5 ${selectedIcon === icon.key ? 'text-blue-600' : 'text-gray-600'}`} />
                </button>
            ))}
        </div>
    );
};

// Icon picker with label component
interface IconPickerWithLabelProps {
    label: string;
    selectedIcon: string;
    onIconSelect: (iconKey: string) => void;
    className?: string;
}

export const IconPickerWithLabel: React.FC<IconPickerWithLabelProps> = ({ label, selectedIcon, onIconSelect, className }) => {
    const selectedIconData = availableIcons.find((icon) => icon.key === selectedIcon);

    return (
        <div className={className}>
            <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
            <IconPicker selectedIcon={selectedIcon} onIconSelect={onIconSelect} />
            <div className="mt-2 text-sm text-gray-500">Icon terpilih: {selectedIconData?.label || 'Tidak ada'}</div>
        </div>
    );
};

export default IconPicker;
