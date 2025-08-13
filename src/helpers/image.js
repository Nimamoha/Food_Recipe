import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import Animated from 'react-native-reanimated';

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Check if image is already cached
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          // Fetch image from network
          const response = await fetch(uri);
          const imageBlob = await response.blob();

          // Convert to Base64
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => resolve(reader.result);
          });

          // Store in AsyncStorage
          await AsyncStorage.setItem(uri, base64Data);

          // Update state
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.error('Error caching image:', error);
        // Fallback to network URI if caching fails
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, []);

  // Render the Animated.Image
  return <Animated.Image source={cachedSource} {...props} />;
};
