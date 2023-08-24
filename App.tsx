import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {Configuration, OpenAIApi} from 'openai';
import {API_KEY} from './constants';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const chat = new OpenAIApi(
    new Configuration({
      apiKey: API_KEY,
    }),
  );

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const queryModel = async () => {
    try {
      chat
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: input,
            },
          ],
        })
        .then(result => {
          setResponse(
            result.data.choices[0].message?.content?.toString() ?? '',
          );
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponse(error.message ?? 'An error occurred');
      } else {
        setResponse('An unexpected error occurred');
      }
    }
  };

  return (
    <View>
      <TextInput
        onChangeText={handleInputChange}
        value={input}
        placeholder="Write something..."
      />
      <Button onPress={queryModel} title="Ask GPT-4" />
      <Text>{response}</Text>
    </View>
  );
};

export default App;
