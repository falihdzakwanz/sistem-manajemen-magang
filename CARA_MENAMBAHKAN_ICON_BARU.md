# Cara Menambahkan Icon Baru

## Langkah-langkah

### 1. Edit `IconPicker.tsx`

```tsx
// 1. Tambahkan import icon baru
import {
    // ...existing imports
    Coffee, // ← Icon baru
    Settings, // ← Icon baru
} from 'lucide-react';

// 2. Tambahkan ke iconMap
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // ...existing icons
    coffee: Coffee, // ← Tambahkan di sini
    settings: Settings, // ← Tambahkan di sini
};

// 3. Tambahkan ke availableIcons array
export const availableIcons = [
    // ...existing icons
    { key: 'coffee', label: 'Coffee', component: Coffee },
    { key: 'settings', label: 'Settings', component: Settings },
];
```

### 2. Langsung Bisa Digunakan

```tsx
// Di EditBeranda.tsx - otomatis ada di picker
<IconPickerWithLabel
    label="Pilih Icon"
    selectedIcon={bidangForm.data.icon}
    onIconSelect={(icon) => setBidangForm(prev => ({
        ...prev,
        data: { ...prev.data, icon }
    }))}
/>

// Di Beranda.tsx - otomatis bisa dirender
<IconDisplay iconName="coffee" className="h-8 w-8" />
```

### 3. Rebuild dan Selesai

```bash
npm run build
```

## Keuntungan

1. **Satu tempat perubahan** - Cukup edit `IconPicker.tsx`
2. **Otomatis tersedia** - Langsung bisa digunakan di semua komponen
3. **Type safety** - TypeScript akan memastikan icon valid
4. **Konsisten** - Icon rendering sama di seluruh aplikasi

## Sebelum Refactoring

Jika ingin menambahkan icon baru, harus edit:

- ✗ `EditBeranda.tsx` (tambah di iconMap dan availableIcons)
- ✗ `Beranda.tsx` (tambah di iconMap)
- ✗ Import di kedua file

## Setelah Refactoring

- ✅ **Hanya edit** `IconPicker.tsx`
- ✅ **Otomatis tersedia** di semua komponen
- ✅ **Lebih mudah maintain**
