$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$wb = $excel.Workbooks.Open('f:\Seo personal\SinglePostAnalytics_Amr Waled_7512242870678949889.xlsx')
$ws = $wb.Sheets.Item(1)
$used = $ws.UsedRange
for ($r = 1; $r -le $used.Rows.Count; $r++) {
    $row = @()
    for ($c = 1; $c -le $used.Columns.Count; $c++) {
        $row += $ws.Cells($r, $c).Text
    }
    Write-Host ($row -join ' | ')
}
$wb.Close($false)
$excel.Quit()
