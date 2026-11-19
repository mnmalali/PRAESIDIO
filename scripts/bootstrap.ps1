# Overlays Codex instructions and skills on an EXISTING PRAESIDIO (renamed Praesidio) tree.
# No source archive import; never removes or renames user application code.
[CmdletBinding()]
param(
    [string]$ProjectRoot = 'C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\PRAESIDIO',
    [string]$WikiPath = 'C:\Users\mnmal\OneDrive\Projects\cyber summit 2026\cyber summit BRAIN',
    [switch]$SkipSkills,
    [switch]$DryRun
)
$ErrorActionPreference = 'Stop'
$kitRoot = Split-Path -Parent $PSScriptRoot
$projectRequired = @('compose.yaml', 'backend', 'frontend', 'sdk')
if (-not (Test-Path -LiteralPath (Join-Path $kitRoot 'CODEX_MASTER_PROMPT.md') -PathType Leaf)) {
    throw "Not a valid PRAESIDIO Codex kit: $kitRoot"
}
if (-not (Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
    throw "Existing PRAESIDIO directory was not found: $ProjectRoot. Rename Praesidio-main to PRAESIDIO first; this installer will not create or extract it."
}
foreach ($required in $projectRequired) {
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot $required))) {
        throw "Missing source item '$required' under $ProjectRoot. Verify you are pointing at the renamed Praesidio source directory. No files changed."
    }
}
$projectResolved = (Resolve-Path -LiteralPath $ProjectRoot).Path
$kitResolved = (Resolve-Path -LiteralPath $kitRoot).Path
if ($projectResolved -eq $kitResolved) { throw 'Extract the kit OUTSIDE the existing project before running INSTALL.ps1.' }
Write-Host "Verified existing Praesidio source: $projectResolved"
Write-Host "Wiki destination: $WikiPath"
$entries = @(
    'AGENTS.md', 'CODEX_MASTER_PROMPT.md', 'START_HERE.md',
    'UPSTREAM_ATTRIBUTION.template.md', 'prompts', 'specs', 'scripts'
)
function Copy-NewOnly([string]$Source, [string]$Destination) {
    if ((Get-Item -LiteralPath $Source).PSIsContainer) {
        if (-not (Test-Path -LiteralPath $Destination)) {
            if ($DryRun) { Write-Host "[dry run] Would copy directory: $Destination" }
            else {
                $parent = Split-Path -Parent $Destination
                if (-not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
                Copy-Item -LiteralPath $Source -Destination $Destination -Recurse
            }
            return
        }
        foreach ($child in (Get-ChildItem -LiteralPath $Source -Force)) {
            Copy-NewOnly -Source $child.FullName -Destination (Join-Path $Destination $child.Name)
        }
    }
    else {
        if (Test-Path -LiteralPath $Destination) {
            Write-Host "Preserved existing file: $Destination"
        }
        elseif ($DryRun) { Write-Host "[dry run] Would create: $Destination" }
        else {
            $parent = Split-Path -Parent $Destination
            if (-not (Test-Path -LiteralPath $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
            Copy-Item -LiteralPath $Source -Destination $Destination
            Write-Host "Installed: $Destination"
        }
    }
}
foreach ($rel in $entries) {
    Copy-NewOnly -Source (Join-Path $kitRoot $rel) -Destination (Join-Path $ProjectRoot $rel)
}
Copy-NewOnly -Source (Join-Path $kitRoot '.agents\skills\praesidio-design') -Destination (Join-Path $ProjectRoot '.agents\skills\praesidio-design')
foreach ($wiki in (Get-ChildItem -LiteralPath (Join-Path $kitRoot 'wiki-seed') -File)) {
    Copy-NewOnly -Source $wiki.FullName -Destination (Join-Path $WikiPath $wiki.Name)
}
if (Test-Path -LiteralPath (Join-Path (Split-Path -Parent $ProjectRoot) '.agents')) {
    Write-Host 'Note: sibling .agents folder was left untouched. Project-specific skills live inside PRAESIDIO\.agents\skills.'
}
if (-not $SkipSkills) {
    if ($DryRun) { Write-Host '[dry run] Would fetch the three third-party skill repositories with git and install selected skills.' }
    else {
        try {
            & (Join-Path $kitRoot 'scripts\install-project-skills.ps1') -ProjectRoot $ProjectRoot
        } catch {
            Write-Warning ("The core kit was installed but third-party skill installation stopped: " + $_.Exception.Message)
            Write-Warning 'After installing Git/network prerequisites, run the skill installer separately (see specs/SKILL_INSTALLATION.md).'
        }
    }
}
if ($DryRun) { Write-Host 'Dry run complete. No files were created or changed.' }
else {
    Write-Host ''
    Write-Host 'PRAESIDIO Codex setup complete (existing source left intact).'
    Write-Host "Open Codex workspace: $ProjectRoot"
    Write-Host 'Read CODEX_MASTER_PROMPT.md to begin Phase 00.'
    Write-Host 'REA MCP requires separate reviewed interactive setup: npx rea-agents@latest setup'
}
