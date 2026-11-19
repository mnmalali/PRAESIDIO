param([string]$WikiPath = 'C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\cyber summit BRAIN')
$ErrorActionPreference='Stop'
$names=@('00_INDEX.md','CURRENT_STATE.md','DECISIONS.md','TASKS.md','RISKS.md')
foreach ($name in $names) {
  $path=Join-Path $WikiPath $name
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing mandatory wiki page: $path" }
  Write-Output ("`n========== " + $name + " ==========")
  Get-Content -LiteralPath $path -Raw -Encoding UTF8
}
