import librosa
import numpy as np

def extract_mfcc(filename, full=False):
    y, sr = librosa.load(filename, sr=16000)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    stats = {
        'mean': np.mean(mfcc, axis=1).round(3).tolist(),
        'std': np.std(mfcc, axis=1).round(3).tolist(),
        'energy': float(np.sum(y ** 2) / len(y)),
        'duration': round(len(y) / sr, 2)
    }
    if full:
        return mfcc, stats
    return mfcc.mean(axis=1)
