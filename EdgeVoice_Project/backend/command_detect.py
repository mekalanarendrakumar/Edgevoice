import os
import numpy as np


def detect_command(mfcc_matrix):
    """
    Detect wake word based on MFCC energy patterns and spectral characteristics.
    This is a DEMO implementation - it detects voice activity and basic patterns.
    For production use, train a real classifier (CNN/RNN) on labeled wake word data.
    """
    
    # Check if there's data
    if mfcc_matrix.size == 0 or mfcc_matrix.shape[1] < 10:
        return None, None
    
    # Calculate energy for each frame (sum of absolute MFCC coefficients)
    frame_energy = np.sum(np.abs(mfcc_matrix), axis=0)
    
    # Balanced threshold - detect speech but not overly sensitive
    energy_mean = np.mean(frame_energy)
    energy_std = np.std(frame_energy)
    energy_threshold = energy_mean + 1.0 * energy_std  # Moderate threshold
    
    high_energy_frames = np.where(frame_energy > energy_threshold)[0]
    
    # Require at least some voice activity
    if len(high_energy_frames) < 8:
        return None, None
    
    # Find continuous speech segments
    segments = []
    if len(high_energy_frames) > 0:
        start_idx = high_energy_frames[0]
        
        for i in range(1, len(high_energy_frames)):
            # If gap is more than 4 frames, it's a new segment
            if high_energy_frames[i] - high_energy_frames[i-1] > 4:
                segments.append((start_idx, high_energy_frames[i-1]))
                start_idx = high_energy_frames[i]
        
        # Add last segment
        segments.append((start_idx, high_energy_frames[-1]))
    
    if not segments:
        return None, None
    
    # Find the longest segment (likely the wake word)
    best_segment = max(segments, key=lambda x: x[1] - x[0])
    segment_length = best_segment[1] - best_segment[0] + 1
    
    # Require a reasonable segment length (10-150 frames is typical speech)
    if segment_length >= 10 and segment_length <= 150:
        segment_mfcc = mfcc_matrix[:, best_segment[0]:best_segment[1]+1]
        
        # Check MFCC variance to distinguish speech from music/background noise
        # Speech has focused energy in lower coefficients; music spreads across all
        lower_coeff_energy = np.mean(np.abs(segment_mfcc[0:5, :]))  # First 5 coefficients
        higher_coeff_energy = np.mean(np.abs(segment_mfcc[5:, :]))  # Rest of coefficients
        
        # Speech ratio: lower coefficients are significantly stronger than higher ones
        speech_ratio = lower_coeff_energy / (higher_coeff_energy + 1e-10)
        
        # Speech typically has speech_ratio > 1.2 (lower coeffs dominate)
        # Music tends to have more balanced energy across all coefficients
        if speech_ratio > 1.1:
            return 'light_on', best_segment
    
    return None, None

