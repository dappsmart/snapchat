import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

export function useFirstTimeOpen() {
    const [isFirstTime, setIsFirstTime] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function checkFirstTimeOpen() {
            try {
              const hasOpened = await AsyncStorage.getItem("hasOpened");
              if (hasOpened === null) {
                // First time opening the app
                setIsFirstTime(true);
              } else {
                setIsFirstTime(false);
              }
            } catch (error) {
              console.error("Failed to check if first time opening the app", error);
            } finally {
              setIsLoading(false);
            }
          }
      
          checkFirstTimeOpen();
        }, []);
      
        return { isFirstTime, isLoading };
      }

    
 