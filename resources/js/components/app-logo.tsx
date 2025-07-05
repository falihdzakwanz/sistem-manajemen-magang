export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <img src="/asset/Logo-Kominfo.png" alt="Logo Kominfo" className="size-8 object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Sistem Manajemen Magang</span>
                <span className="text-xs text-muted-foreground">Kominfo</span>
            </div>
        </>
    );
}
