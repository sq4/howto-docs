```bash
ffmpeg \
-rtsp_transport tcp \
-fflags nobuffer \
-analyzeduration 1000000 \
-i rtsp://192.168.6.16/11 \
-c copy \
-f flv rtmp://127.0.0.1:1935/live/ipcam02 \
-codec copy \
-an \
-f segment \
-strftime 1 \
-segment_time 1500 \
-reset_timestamps 1 \
-segment_format_options movflags=+faststart \
-segment_format mp4 /records/ipcam02_%Y-%m-%d_%H-%M-%S.mp4
```
ls /records/
```bash
ipcam02_2020-03-02_13-53-45.mp4
ipcam02_2020-03-02_14-18-44.mp4
ipcam02_2020-03-02_14-43-44.mp4
```bash
