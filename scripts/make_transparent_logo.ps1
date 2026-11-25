Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo-horizontal.jpg"
$destPng = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color is approximately R=254, G=244, B=244
for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Calculate brightness / difference from black text
        # The text is very dark (R < 60, G < 60, B < 60)
        # Background is very light (R > 240, G > 230, B > 230)
        $r = [int]$pixel.R
        $g = [int]$pixel.G
        $b = [int]$pixel.B
        $brightness = ($r + $g + $b) / 3.0

        if ($brightness -gt 240) {
            # Fully transparent
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($brightness -lt 140) {
            # Fully opaque dark text
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 31, 26, 24))
        } else {
            # Anti-aliased edge: interpolate alpha
            $alpha = [int](255 * (240 - $brightness) / 100.0)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 31, 26, 24))
        }
    }
}

$outBmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()
$bmp.Dispose()

Write-Host "Created transparent PNG logo at: $destPng"
