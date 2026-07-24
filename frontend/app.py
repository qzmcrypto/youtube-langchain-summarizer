import streamlit as st
import requests

# Page setup
st.set_page_config(page_title="AI YouTube Summarizer", page_icon="🎥")
st.title("🎥 AI YouTube Summarizer")
st.write("Paste a YouTube URL below to get an AI-generated summary!")

# User Input
video_url = st.text_input("YouTube Video URL:", placeholder="https://www.youtube.com/watch?v=...")

# Button
if st.button("Generate Summary"):
    if video_url:
        data = None
        error_message = None

        # Show a clear, step-by-step processing status with a built-in spinner
        with st.status("Processing your video...", expanded=True) as status:
            st.write("🔗 Sending video to the backend...")
            st.write("📝 Extracting transcript and metadata...")
            st.write("🤖 Generating AI summary... this may take a moment.")
            try:
                # Call our FastAPI backend
                api_url = f"http://127.0.0.1:8000/summarize?url={video_url}"
                response = requests.get(api_url)

                if response.status_code == 200:
                    data = response.json()
                    status.update(label="Summary ready!", state="complete", expanded=False)
                else:
                    error_message = f"Error from Backend: {response.text}"
                    status.update(label="Something went wrong", state="error", expanded=True)

            except requests.exceptions.ConnectionError:
                error_message = "🚨 Could not connect to the backend! Is your FastAPI server running?"
                status.update(label="Could not reach backend", state="error", expanded=True)

        if data:
            st.success("✅ Summary generated successfully!")

            # Display video metadata above the summary
            metadata = data.get("metadata", {})
            if metadata.get("title") or metadata.get("channel") or metadata.get("thumbnail_url"):
                thumb_col, info_col = st.columns([1, 2])
                with thumb_col:
                    if metadata.get("thumbnail_url"):
                        st.image(metadata["thumbnail_url"], width="stretch")
                with info_col:
                    if metadata.get("title"):
                        st.subheader(metadata["title"])
                    if metadata.get("channel"):
                        st.caption(f"Channel: {metadata['channel']}")
                st.divider()

            # Display the text summary beautifully
            st.markdown(data["summary"])
        elif error_message:
            st.error(error_message)
    else:
        st.warning("Please enter a valid YouTube URL first.")