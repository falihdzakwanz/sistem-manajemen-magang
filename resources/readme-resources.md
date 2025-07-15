# Resources Directory Documentation

## Struktur Folder Resources

Folder `resources` berisi semua raw assets, views, dan frontend components yang akan di-compile atau di-process oleh Laravel.

### Struktur Folder:

```
resources/
├── css/                    # Stylesheet files
│   └── app.css            # Main CSS file dengan Tailwind
├── js/                     # Frontend JavaScript/TypeScript
│   ├── app.tsx            # Main React application entry
│   ├── ssr.tsx            # Server-side rendering entry
│   ├── components/        # Reusable React components
│   │   ├── FileInput.tsx  # File upload component
│   │   ├── Footer.tsx     # Footer component
│   │   ├── input-error.tsx # Error input component
│   │   ├── Layout.tsx     # Main layout component
│   │   ├── Navbar.tsx     # Navigation component
│   │   └── ui/            # UI component library
│   ├── lib/               # Utility libraries
│   ├── pages/             # Inertia.js page components
│   │   ├── admin/         # Admin dashboard pages
│   │   └── user/          # User-facing pages
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── views/                  # Blade template files
│   ├── app.blade.php      # Main app layout
│   └── emails/            # Email templates
│       ├── status-diterima.blade.php  # Approval email
│       └── status-ditolak.blade.php   # Rejection email
└── readme-resources.md     # Dokumentasi folder ini
```

## Deskripsi Detail Folder dan File:

### 📁 css/

#### 📄 app.css

- **Fungsi**: Main stylesheet aplikasi
- **Framework**: Tailwind CSS
- **Content**:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* Custom styles */
    ```

- **Build Process**: Di-compile oleh Vite dengan PostCSS

### 📁 js/

Frontend React application dengan TypeScript:

#### 📄 app.tsx

- **Fungsi**: Entry point React application
- **Framework**: Inertia.js + React
- **Kode Utama**:
    ```tsx
    // Setup Inertia.js dengan React
    createInertiaApp({
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`),
        setup({ el, App, props }) {
            const root = createRoot(el);
            root.render(<App {...props} />);
        },
    });
    ```

#### 📄 ssr.tsx

- **Fungsi**: Server-side rendering entry point
- **Purpose**: SEO optimization dan faster initial load
- **Usage**: Production SSR setup

#### 📁 components/

Reusable React components:

**📄 Layout.tsx**

- **Fungsi**: Main layout wrapper
- **Features**:
    - Header dengan navigation
    - Footer
    - Responsive design
    - Common UI elements

**📄 Navbar.tsx**

- **Fungsi**: Navigation component
- **Features**:
    - Desktop/mobile responsive
    - User authentication state
    - Route highlighting

**📄 Footer.tsx**

- **Fungsi**: Footer component
- **Content**:
    - Copyright information
    - Links ke social media
    - Contact information

**📄 FileInput.tsx**

- **Fungsi**: Custom file upload component
- **Features**:
    - Drag & drop support
    - File type validation
    - Progress indicator
    - Error handling

**📄 input-error.tsx**

- **Fungsi**: Error message component
- **Usage**: Display validation errors
- **Styling**: Consistent error styling

**📁 ui/**

- **Fungsi**: UI component library (shadcn/ui)
- **Components**: Button, Input, Dialog, Card, dll
- **Styling**: Tailwind-based components

#### 📁 lib/

- **Fungsi**: Utility libraries dan configurations
- **Content**:
    - API helpers
    - Form validation schemas
    - Common utilities

#### 📁 pages/

Inertia.js page components:

**📁 admin/**

- **Dashboard**: Admin dashboard utama
- **UserManagement**: Manage data mahasiswa
- **Reports**: Laporan dan analytics
- **Settings**: Konfigurasi sistem

**📁 user/**

- **DaftarMagang**: Form pendaftaran magang
- **StatusCheck**: Check status aplikasi
- **Profile**: User profile management

#### 📁 types/

- **Fungsi**: TypeScript type definitions
- **Content**:
    - API response types
    - Model interfaces
    - Component prop types
    - Global type declarations

#### 📁 utils/

- **Fungsi**: Utility functions
- **Content**:
    - Date formatters
    - String helpers
    - API client
    - Validation helpers

### 📁 views/

Blade template files:

#### 📄 app.blade.php

- **Fungsi**: Main HTML layout
- **Features**:
    - HTML5 boilerplate
    - Meta tags untuk SEO
    - Vite asset loading
    - Inertia.js integration
- **Structure**:
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title inertia>{{ config('app.name') }}</title>
            @vite(['resources/js/app.tsx', 'resources/css/app.css']) @inertiaHead
        </head>
        <body>
            @inertia
        </body>
    </html>
    ```

#### 📁 emails/

Email template files:

**📄 status-diterima.blade.php**

- **Fungsi**: Email template untuk approval
- **Content**:
    - Congratulations message
    - Next steps information
    - Contact details
    - Professional styling

**📄 status-ditolak.blade.php**

- **Fungsi**: Email template untuk rejection
- **Content**:
    - Polite rejection message
    - Reason untuk rejection (jika ada)
    - Encouragement untuk apply again
    - Contact untuk questions

## Tech Stack:

### Frontend:

- **React 18**: Modern React dengan hooks
- **TypeScript**: Type safety dan better DX
- **Inertia.js**: SPA-like experience dengan server-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool dan dev server

### UI Components:

- **Headless UI**: Unstyled, accessible components
- **Radix UI**: Low-level UI primitives
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **Zod**: Schema validation

## Build Process:

### Development:

```bash
# Start development server
npm run dev

# Type checking
npm run types

# Linting
npm run lint

# Formatting
npm run format
```

### Production:

```bash
# Build untuk production
npm run build

# Build dengan SSR
npm run build:ssr
```

## File Organization:

### Component Structure:

```tsx
// Component template
interface ComponentProps {
  // Type definitions
}

export function Component({ ...props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Page Structure:

```tsx
// Inertia page component
interface PageProps {
    // Props dari Laravel controller
}

export default function Page({ ...props }: PageProps) {
    // Page logic
    return <Layout>{/* Page content */}</Layout>;
}
```

## Catatan untuk Developer:

### Best Practices:

1. **TypeScript**: Gunakan proper typing untuk semua components
2. **Component Reusability**: Buat components yang reusable
3. **Performance**: Implement lazy loading untuk pages
4. **Accessibility**: Follow accessibility guidelines
5. **SEO**: Use proper meta tags dan SSR

### Code Style:

- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **File Naming**: PascalCase untuk components, kebab-case untuk utilities
- **Import Organization**: Group imports logically

### State Management:

- **Local State**: React useState untuk component state
- **Form State**: React Hook Form untuk forms
- **Server State**: Inertia.js untuk server data
- **Global State**: Context API jika diperlukan

### Performance Tips:

- **Code Splitting**: Implement automatic code splitting
- **Image Optimization**: Optimize images dan use lazy loading
- **Bundle Analysis**: Regular bundle size analysis
- **Caching**: Implement proper caching strategies

### Troubleshooting:

- **Build Errors**: Check TypeScript errors dan import paths
- **Hot Reload Issues**: Restart dev server
- **CSS Issues**: Check Tailwind configuration
- **Component Not Rendering**: Verify Inertia.js page resolution
