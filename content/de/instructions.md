+++
draft = false
construction = false
date = "2025-10-03T03:47:28+02:00"
lang = "de"
author = "Spike Murphy Müller"
title = "Anleitung"
description = ""
tags = []
categories = []
+++


## Versions
We offer two versions of the program **ConformationLab Studio** -- a *BASIC mode* and an *ADVANCED mode*.  
The ADVANCED mode offers additional parameters that are not essential for the intended target group.  
Howewer we implemented them in case someone wants to try them out.  

## Overview & Preparation
As the input a simple FASTA-file is used.  
The file can be downloaded from databases or easily created using text editor:
1. Press command+space
2. Type in TextEdit and open TextEdit.
3. In the first line type > followed by the name of the protein
4. Press Return/Enter and in the second line insert the one-letter-code of the protein sequence
5. If you want to model multimers, separate the sequences by : and use no spaces or line breaks
6. Save the file with the suffix .fasta

## Usage
1. To prepare a run, select the FASTA-file as an input and indicate the output location.  
2. Adjust the options as necessary.  
3. All adjustments can be undone by clicking the clear all button.  
4. Start the modeling process by clicking the run button.  
5. To show system exertion navigate to the menu bar and to help -> system stats.  
6. A run can be canceled at any time by clicking the cancle button.

## Parameters

A list of options (with defaults and descriptions) is provided in the information fields to the right of the input fields or dropdown menus.

### Seeds

#### `--`num-seeds
**What it does:** Number of prediction runs with different random seeds. More seeds = more structural diversity.  
**Possible entries:** Integer ≥ 1.  
**Default:** 3 (balance between diversity and runtime).  
**Suggestion:** Keep at 3 for exploration; increase to 5–10 for critical projects.  

#### `--`random-seed
**What it does:** Starting seed for random number generation. Subsequent seeds are derived automatically.  
**Possible entries:** Integer ≥ 0, or leave empty.  
**Default:** Empty = tool picks randomly.  
**Suggestion:** Leave blank unless you need reproducibility; then set a fixed value (e.g. 42).  

### Model

#### `--`model-type
**What it does:** Selects which AlphaFold model variant is used.  
**Possible entries:** auto, alphafold2_ptm, alphafold2_multimer_v1, alphafold2_multimer_v2, alphafold2_multimer_v3.    
**Default:** auto (tool picks best: ptm for monomer, multimer_v3 for complexes).    
**Suggestion:** Use auto unless you specifically need an older model for comparison.    

#### `--`num-models *(davanced module)*
**What it does:** Controls how many of the five internal model weights are used.  
**Possible entries:** Integer 1–5.  
**Default:** 5 (all models).  
**Suggestion:** Keep default unless time is critical (then 2–3).  

#### `--`model-order *(davanced module)*
**What it does:** Order in which the 5 models are applied.  
**Possible entries:** Permutations of [1–5].  
**Default:** Predefined internal order.  
**Suggestion:** Leave at default (no practical gain from changing).  

### Recycles

#### `--`num-recycle	
**What it does:** Number of iterative refinement passes (recycles).  
**Possible entries:** Integer ≥ 0.  
**Default:** 3 (monomer), ~20 (multimer v3).  
**Suggestion:** Keep default unless accuracy is poor; increase gradually.  

#### `--`recycle-early-stop-tolerance
**What it does:** Stops recycling early if confidence gains are below threshold.  
**Possible entries:** Float ≥ 0, or "auto".  
**Default:** auto → 0.0 for monomer, 0.5 for multimer.  
**Suggestion:** Use auto; set explicit threshold if compute is limited.  

#### `--`num-ensemble *(davanced module)*
**What it does:** Number of ensemble predictions per model (extra averaging).  
**Possible entries:** Integer ≥ 1.  
**Default:** 1 (no extra ensembles).  
**Suggestion:** Leave at 1; use >1 only if you suspect instability.  

### Multi Sequence Alignment

#### `--`msa-mode
**What it does:** Chooses how the MSA database is searched.  
**Possible entries:** mmseqs2_uniref_env (search against UniRef using MMseqs2 and includes environmental database), mmseqs2_uniref (search against UniRef using MMseqs2), single_sequence (does not search databases for MSA).  
**Default:** mmseqs2_uniref_env.  
**Suggestion:** Stick to mmseqs2_uniref_env for reliable results; try mmseqs2_uniref to reduce runtime.  

#### `--`max-msa
**What it does:** Number of sequences/clusters included in MSA.  
**Possible entries:** Format X:Y (clusters : extra sequences).  
**Default:** 256:256.  
**Suggestion:** Keep default; reduce if you want speed, increase slightly for rare proteins.  

#### `--`pair-mode
**What it does:** Determines whether chains are aligned independently or paired.  
**Possible entries:** unpaired_paired, unpaired, paired.  
**Default:** unpaired_paired (safe and flexible).  
**Suggestion:** Keep default; use "paired" only if complex pairing is experimentally known.  

#### `--`disable-cluster-profile *(davanced module)*
**What it does:** Turns off cluster profile in MSA (affects low-depth MSAs).  
**Possible entries:** Flag (yes/no).  
**Default:** Off (cluster profile used).  
**Suggestion:** Ignore unless experimenting with very shallow alignments.  

### Ranking

#### `--`rank
**What it does:** Metric for ranking best models.  
**Possible entries:** auto, plddt, ptm, iptm, multimer.  
**Default:** auto (plddt for monomer, multimer score for complexes).  
**Suggestion:** Leave at auto; only override if you want to force a specific metric.  

### Templates

#### `--`templates
**What it does:** Enables structural template usage (bias from PDB).  
**Possible entries:** Yes/No.  
**Default:** No (for unbiased predictions).  
**Suggestion:** Keep No unless you specifically want to bias toward known homologs.  

#### `--`custom-template-path *(davanced module)*
**What it does:** Lets you provide your own template files.  
**Possible entries:** File/folder path.  
**Default:** None.  
**Suggestion:** Ignore unless you have a curated template.  

### Amber Relaxation

#### `--`amber
**What it does:** Enables Amber relaxation (refines geometry, fixes clashes).  
**Possible entries:** Yes/No.  
**Default:** No (saves time/memory).  
**Suggestion:** Enable for final publication-quality structures, disable for screening.  

#### `--`num-relax
**What it does:** Number of models to relax with Amber.  
**Possible entries:** Integer ≥ 0.  
**Default:** 0 (skip).  
**Suggestion:** Use 5 if Amber is enabled and you want the top 5 refined.  

<!-- no GPU on mac
#### `--`use-gpu-relax
if GPU-accelerated relaxation is supported, use GPU for Amber relax. 
-->

### Output

#### `--`use-dropout *(davanced module)*
**What it does:** Activates dropout during inference → estimates uncertainty.  
**Possible entries:** Yes/No.  
**Default:** No.  
**Suggestion:** Only for uncertainty analysis; leave off otherwise.  

#### `--`stop-at-score *(davanced module)*
**What it does:** Stops once a model reaches threshold confidence.  
**Possible entries:** Float (e.g. pLDDT ≥ 90).  
**Default:** None.  
**Suggestion:** Use if compute is expensive and you only need high-confidence models.  

#### `--`save-all *(davanced module)*
**What it does:** Saves extra pickled intermediate outputs.  
**Possible entries:** Yes/No.  
**Default:** No.  
**Suggestion:** Leave off unless debugging or deeply analyzing.  

#### `--`save-recycles *(davanced module)*
**What it does:** Saves all recycle states instead of only the final.  
**Possible entries:** Yes/No.  
**Default:** No.  
**Suggestion:** Keep off; turn on for analysis of convergence.  

<!-- for debugging
#### `--`save-single-representations 
#### `--`save-pair-representations
-->

#### `--`overwrite-existing-results
**What it does:** Whether to overwrite output files if they exist.  
**Possible entries:** Yes/No.  
**Default:** No (safety against data loss).  
**Suggestion:** Keep No unless rerunning deliberately.  

#### `--`zip
**What it does:** Compresses results into ZIP.  
**Possible entries:** Yes/No.  
**Default:** Yes (convenient packaging).  
**Suggestion:** Yes unless you want raw folders for custom postprocessing.  









<!-- 🌟 Sinnvoll für Nutzer (UI behalten)

Diese sind wirklich nützlich und verständlich, wenn man Proteinvorhersagen steuern will:
Seeds: --num-seeds, --random-seed
Model: --model-type, (evtl. --num-models)
Recycles: --num-recycle, --recycle-early-stop-tolerance
MSA: --max-msa, --msa-mode, --pair-mode
Ranking: --rank
Templates: --templates, --custom-template-path
Amber Relaxation: --amber, --num-relax, --use-gpu-relax
Output: --overwrite-existing-results, --zip

-->