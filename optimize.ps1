Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param (
        [string]$InPath,
        [string]$OutPath,
        [int]$TargetWidth
    )
    $image = [System.Drawing.Image]::FromFile($InPath)
    $ratio = $TargetWidth / $image.Width
    if ($ratio -ge 1) {
        $image.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $image.Dispose()
        return
    }
    $newHeight = [int]($image.Height * $ratio)
    $bmp = New-Object System.Drawing.Bitmap($TargetWidth, $newHeight)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.DrawImage($image, 0, 0, $TargetWidth, $newHeight)
    
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
    
    $bmp.Save($OutPath, $codec, $encoderParams)
    $graph.Dispose()
    $bmp.Dispose()
    $image.Dispose()
}

Resize-Image "f:\Seo personal\amr-1.jpg" "f:\Seo personal\amr-1-opt.jpg" 500
Resize-Image "f:\Seo personal\amr-2.png" "f:\Seo personal\amr-2-opt.jpg" 400
Resize-Image "f:\Seo personal\amr-5.jpg" "f:\Seo personal\amr-5-opt.jpg" 400
