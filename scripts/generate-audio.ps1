$ErrorActionPreference = 'Stop'
$alfateaRaiz = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$alfateaPasta = [IO.Path]::GetFullPath((Join-Path $alfateaRaiz 'assets/audio'))
$alfateaCatalogo = Get-Content -LiteralPath (Join-Path $alfateaPasta 'catalog.json') -Raw -Encoding utf8 | ConvertFrom-Json
Add-Type -AssemblyName System.Speech
$alfateaVoz = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $alfateaVoz.SelectVoice($alfateaCatalogo.voz)
  $alfateaVoz.Rate = -2
  $alfateaVoz.Volume = 80
  $alfateaFormato = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(24000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
  foreach ($alfateaItem in $alfateaCatalogo.gravacoes) {
    if ($alfateaItem.id -notmatch '^[a-z-]+$') { throw 'Identificador de áudio inválido.' }
    $alfateaArquivo = [IO.Path]::GetFullPath((Join-Path $alfateaPasta ($alfateaItem.id + '.wav')))
    if (-not $alfateaArquivo.StartsWith($alfateaPasta + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Arquivo fora da pasta de áudio.' }
    if (Test-Path -LiteralPath $alfateaArquivo) { continue }
    $alfateaVoz.SetOutputToWaveFile($alfateaArquivo, $alfateaFormato)
    $alfateaVoz.Speak($alfateaItem.texto)
    $alfateaVoz.SetOutputToNull()
  }
  Write-Output 'Gravações locais geradas. Revisar pronúncia e volume antes de marcar revisado=true no catálogo.'
} finally { $alfateaVoz.Dispose() }
