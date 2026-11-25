Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo.jpg"
$destSquare = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo-badge.jpg"
$destWide = "c:\Users\gunde\OneDrive\Desktop\Ishuu nails Web\sleek-polish\public\images\logo-horizontal.jpg"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Dimensions: 1024 x 1024
# The text "Sleek & Polish" and "BY ISH" is vertically centered around y=400 to y=620, x=100 to x=924
# Let's crop a tight, high-res horizontal logo:
$rectWide = New-Object System.Drawing.Rectangle(80, 360, 864, 300)
$croppedWide = $bmp.Clone($rectWide, $bmp.PixelFormat)
$croppedWide.Save($destWide, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$croppedWide.Dispose()

Write-Host "Saved wide logo: $destWide"

$bmp.Dispose()
