import streamlit as st
import librosa
import numpy as np
import io
import os
import sys

# Add backend directory to path
sys.path.insert(0, 'EdgeVoice_Project/backend')

try:
    from command_detect import detect_command
except ImportError:
    detect_command = None

st.set_page_config(page_title="EdgeVoice", layout="wide", initial_sidebar_state="expanded")

st.title("🎙️ EdgeVoice - Audio Processing")
st.markdown("Upload or record audio to extract MFCC coefficients and detect wake words")

# Sidebar
with st.sidebar:
    st.header("⚙️ Settings")
    sample_rate = st.number_input("Sample Rate (Hz)", value=16000, min_value=8000, max_value=48000)
    n_mfcc = st.number_input("MFCC Coefficients", value=13, min_value=1, max_value=40)

# Tabs
tab1, tab2, tab3 = st.tabs(["📤 Upload Audio", "🎤 Record Audio", "📊 Results"])

with tab1:
    st.header("Upload Audio File")
    uploaded_file = st.file_uploader("Choose an audio file", type=['wav', 'mp3', 'ogg', 'm4a'])
    
    if uploaded_file is not None:
        st.audio(uploaded_file)
        
        if st.button("Extract MFCC", key="extract_upload"):
            try:
                # Load audio
                audio_data = uploaded_file.read()
                y, sr = librosa.load(io.BytesIO(audio_data), sr=sample_rate)
                
                st.success(f"✅ Audio loaded: {len(y):,} samples at {sr} Hz")
                
                # Extract MFCC
                mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
                st.success(f"✅ MFCC extracted: shape {mfcc.shape}")
                
                # Store in session
                st.session_state.mfcc = mfcc
                st.session_state.y = y
                st.session_state.sr = sr
                
                # Wake word detection
                if detect_command:
                    try:
                        is_wake_word = detect_command(y, sr)
                        if is_wake_word:
                            st.warning("🔊 Wake word DETECTED!")
                        else:
                            st.info("No wake word detected")
                    except Exception as e:
                        st.warning(f"⚠️ Wake word detection error: {e}")
                
            except Exception as e:
                st.error(f"❌ Error: {e}")

with tab2:
    st.header("Record Audio")
    audio_data = st.audio_input("🎤 Record your voice", sample_rate=sample_rate)
    
    if audio_data is not None:
        if st.button("Extract MFCC from Recording", key="extract_record"):
            try:
                # Load from recorded bytes
                y, sr = librosa.load(io.BytesIO(audio_data), sr=sample_rate)
                
                st.success(f"✅ Audio loaded: {len(y):,} samples at {sr} Hz")
                
                # Extract MFCC
                mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
                st.success(f"✅ MFCC extracted: shape {mfcc.shape}")
                
                # Store in session
                st.session_state.mfcc = mfcc
                st.session_state.y = y
                st.session_state.sr = sr
                
                # Wake word detection
                if detect_command:
                    try:
                        is_wake_word = detect_command(y, sr)
                        if is_wake_word:
                            st.warning("🔊 Wake word DETECTED!")
                        else:
                            st.info("No wake word detected")
                    except Exception as e:
                        st.warning(f"⚠️ Wake word detection error: {e}")
                
            except Exception as e:
                st.error(f"❌ Error: {e}")

with tab3:
    st.header("📊 MFCC Results")
    
    if 'mfcc' in st.session_state:
        mfcc = st.session_state.mfcc
        y = st.session_state.y
        sr = st.session_state.sr
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.metric("Duration (seconds)", f"{len(y) / sr:.2f}s")
            st.metric("MFCC Shape", f"{mfcc.shape}")
        
        with col2:
            st.metric("Sample Rate", f"{sr} Hz")
            st.metric("Total Coefficients", f"{mfcc.size:,}")
        
        # Visualization
        st.subheader("MFCC Heatmap")
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(10, 4))
        img = librosa.display.specshow(mfcc, sr=sr, x_axis='time', ax=ax)
        plt.colorbar(img, ax=ax)
        plt.title('MFCC Coefficients')
        st.pyplot(fig)
        
        # Download as CSV
        csv_buffer = io.StringIO()
        np.savetxt(csv_buffer, mfcc, delimiter=',')
        csv_data = csv_buffer.getvalue()
        
        st.download_button(
            label="📥 Download MFCC as CSV",
            data=csv_data,
            file_name="mfcc.csv",
            mime="text/csv"
        )
    else:
        st.info("👆 Upload or record audio to see results")

st.markdown("---")
st.markdown("Made with ❤️ by EdgeVoice | Deployed with Streamlit")
