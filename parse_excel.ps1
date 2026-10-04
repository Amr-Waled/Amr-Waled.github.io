[xml]$strings = Get-Content 'f:\Seo personal\analytics_extracted\xl\sharedStrings.xml'
$strList = $strings.sst.si | ForEach-Object { $_.t }
Write-Host '=== Shared Strings ==='
$strList | ForEach-Object { Write-Host $_ }

Write-Host ''
Write-Host '=== Sheet Data ==='
[xml]$sheet = Get-Content 'f:\Seo personal\analytics_extracted\xl\worksheets\sheet1.xml'
$sheet.worksheet.sheetData.row | ForEach-Object {
    $row = $_
    $cells = $row.c | ForEach-Object {
        $cell = $_
        if ($cell.t -eq 's') { $strList[[int]$cell.v] }
        else { $cell.v }
    }
    Write-Host ($cells -join ' | ')
}
