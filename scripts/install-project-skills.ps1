param(
    [string]$ProjectRoot = 'C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\PRAESIDIO',
    [switch]$ReplaceExisting
)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git is required to clone the official skill repositories.' }
if (-not (Test-Path -LiteralPath $ProjectRoot)) { throw "Project folder does not exist: $ProjectRoot" }
$target = Join-Path $ProjectRoot '.agents\skills'
New-Item -ItemType Directory -Path $target -Force | Out-Null
$temporary = Join-Path ([IO.Path]::GetTempPath()) ('praesidio-skills-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temporary -Force | Out-Null
$records = @()
try {
    $specs = @(
      @{ repo='https://github.com/heydamir/unslop.git'; slug='unslop'; paths=@('skills/unslop') },
      @{ repo='https://github.com/ibelick/ui-skills.git'; slug='ui-skills'; paths=@('skills/baseline-ui','skills/improve-ui','skills/fixing-accessibility','skills/fixing-motion-performance','skills/fixing-metadata','skills/create-design-md') },
      @{ repo='https://github.com/morluto/rea.git'; slug='rea'; paths=@('.agents/skills/reverse-engineer-anything') }
    )
    foreach ($spec in $specs) {
      $repoPath = Join-Path $temporary $spec.slug
      Write-Host "Cloning $($spec.repo) for review/copy..."
      & git clone --depth 1 --quiet $spec.repo $repoPath
      if ($LASTEXITCODE -ne 0) { throw "Could not clone $($spec.repo)" }
      $sha = (& git -C $repoPath rev-parse HEAD).Trim()
      foreach ($rel in $spec.paths) {
        $source = Join-Path $repoPath ($rel -replace '/', '\')
        if (-not (Test-Path -LiteralPath (Join-Path $source 'SKILL.md'))) { throw "Expected SKILL.md not found: $source" }
        $name = Split-Path $rel -Leaf
        $dest = Join-Path $target $name
        if (Test-Path -LiteralPath $dest) {
          if (-not $ReplaceExisting) { Write-Host "Existing skill retained: $name (use -ReplaceExisting after review)"; continue }
          $backupRoot = Join-Path $ProjectRoot '.agents\skills-backup'
          New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
          $backup = Join-Path $backupRoot ($name + '-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
          Move-Item -LiteralPath $dest -Destination $backup
          Write-Host "Backed up previous $name to $backup"
        }
        Copy-Item -LiteralPath $source -Destination $dest -Recurse -Force
        $records += [pscustomobject]@{Skill=$name;Repo=$spec.repo;Commit=$sha;Source=$rel}
        Write-Host "Installed $name ($sha)"
      }
    }
    $reportDir = Join-Path $ProjectRoot 'docs\praesidio'
    New-Item -ItemType Directory -Path $reportDir -Force | Out-Null
    $reportFile = Join-Path $reportDir 'SKILL_SOURCES.md'
    $lines = @('# Project skill origin records', '', 'Generated: ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK'), '', '| Skill | Source repository | HEAD SHA | Relative path |', '|---|---|---|---|')
    foreach ($r in $records) { $lines += "| $($r.Skill) | $($r.Repo) | $($r.Commit) | $($r.Source) |" }
    $lines += '', 'License notes: Unslop CC BY 4.0 (credit Damir Sokolovsky); ui-skills MIT; REA MIT. Review all bundled resources and dependent licenses before distribution.', '', 'REA MCP server is NOT registered by copying its skill. Use the official interactive `npx rea-agents@latest setup` after review.'
    Set-Content -LiteralPath $reportFile -Value $lines -Encoding UTF8
    Write-Host "Skill source report: $reportFile"
} finally {
    if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary -Recurse -Force }
}
