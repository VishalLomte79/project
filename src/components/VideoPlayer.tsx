import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { colors } from '../theme/colors';

interface VideoPlayerProps {
    videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
    const video = useRef<Video>(null);
    const [status, setStatus] = useState({});

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: videoUrl,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: 'black',
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 16,
    },
    video: {
        flex: 1,
    },
});
