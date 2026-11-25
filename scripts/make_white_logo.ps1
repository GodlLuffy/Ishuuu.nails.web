Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo-horizontal.jpg"
$destWhitePng = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo-white.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        $r = [int]$pixel.R
        $g = [int]$pixel.G
        $b = [int]$pixel.B
        $brightness = ($r + $g + $b) / 3.0

        if ($brightness -gt 240) {
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($brightness -lt 140) {
            # White text
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        } else {
            $alpha = [int](255 * (240 - $brightness) / 100.0)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
    }
}

$outBmp.Save($destWhitePng, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()
$bmp.Dispose()

Write-Host "Created white PNG logo at: $destWhitePng"
