# Script Pembersihan Foto Temporary
# File: cleanup-temp-photos.ps1

Write-Host "🧹 Membersihkan Foto Temporary..." -ForegroundColor Green

$tempPath = "storage\app\public\photos\temp"
$currentTime = Get-Date

if (Test-Path $tempPath) {
    $tempFiles = Get-ChildItem $tempPath -File
    $deletedCount = 0
    
    foreach ($file in $tempFiles) {
        $ageInHours = ($currentTime - $file.LastWriteTime).TotalHours
        
        if ($ageInHours -gt 1) {
            Remove-Item $file.FullName -Force
            $deletedCount++
            Write-Host "  🗑️  Deleted: $($file.Name)" -ForegroundColor Yellow
        }
    }
    
    if ($deletedCount -gt 0) {
        Write-Host "✅ Berhasil menghapus $deletedCount foto temporary." -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Tidak ada foto temporary yang perlu dihapus." -ForegroundColor Cyan
    }
} else {
    Write-Host "⚠️  Folder temp tidak ditemukan: $tempPath" -ForegroundColor Yellow
}

# Juga bersihkan storage link jika diperlukan
if (Test-Path "public\storage\photos\temp") {
    Write-Host "🔗 Membersihkan storage link temp..." -ForegroundColor Green
    
    $publicTempFiles = Get-ChildItem "public\storage\photos\temp" -File
    $deletedCount = 0
    
    foreach ($file in $publicTempFiles) {
        $ageInHours = ($currentTime - $file.LastWriteTime).TotalHours
        
        if ($ageInHours -gt 1) {
            Remove-Item $file.FullName -Force
            $deletedCount++
            Write-Host "  🗑️  Deleted: $($file.Name)" -ForegroundColor Yellow
        }
    }
    
    if ($deletedCount -gt 0) {
        Write-Host "✅ Berhasil menghapus $deletedCount file dari storage link." -ForegroundColor Green
    }
}

Write-Host "🎉 Cleanup selesai!" -ForegroundColor Green
