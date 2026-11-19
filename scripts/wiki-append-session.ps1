param(
  [Parameter(Mandatory=$true)][string]$Summary,
  [string]$WikiPath = 'C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\cyber summit BRAIN'
)
$ErrorActionPreference='Stop'
$file=Join-Path $WikiPath 'SESSION_LOG.md'
if (-not (Test-Path -LiteralPath $file)) { throw "Missing wiki log: $file" }
$stamp=(Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK')
Add-Content -LiteralPath $file -Value ("`n## " + $stamp + "`n" + $Summary + "`n") -Encoding UTF8
Write-Host "Appended session note: $file"
