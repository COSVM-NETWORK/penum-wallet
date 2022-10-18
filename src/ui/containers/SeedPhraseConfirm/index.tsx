import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import {
  generate_spend_key,
  get_full_viewing_key,
} from 'penumbra-web-assembly';

const shuffle = (array: string[]) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

type SeedPhraseConfirmProps = {
  background: any;
};

export const SeedPhraseConfirm: React.FC<SeedPhraseConfirmProps> = ({
  background,
}) => {
  const { keys } = background.state;
  const { addKey } = background;

  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    const stringSelectedWords = selectedWords.join(' ');

    stringSelectedWords === keys[0].mnemonic
      ? setDisabledBtn(false)
      : setDisabledBtn(true);
  }, [selectedWords, keys[0].mnemonic]);

  const addWord = (word: string) => () => {
    if (selectedWords.includes(word)) return;
    setSelectedWords((state) => [...state, word]);
  };

  const deleteWord = (word: string) => () => {
    const withoutWord = selectedWords.filter((i) => i !== word);
    setSelectedWords(withoutWord);
  };

  const handleSubmit = () => {
    const spendKey = generate_spend_key(keys[0].mnemonic);
    const fvk = get_full_viewing_key(spendKey);
    addKey([{ spendKey, fvk }]);
  };
  const shufleMnemonic = useMemo(() => {
    return shuffle(keys[0].mnemonic.split(' '));
  }, [keys[0].mnemonic]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingX: '5px',
      }}
    >
      <Typography sx={{ fontSize: '24px' }}>
        Confirm your secret backup phrase
      </Typography>
      <Typography sx={{ fontSize: '14px' }}>
        Choose each phrase to make sure it is correct.
      </Typography>
      <Box
        sx={{
          minHeight: '180px',
          width: '100%',
          border: '1px solid black',
          borderRadius: '5px',
          marginY: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            padding: '4px',
          }}
        >
          {selectedWords.map((i) => {
            return (
              <Box
                key={i}
                sx={{
                  flex: '0 0 25%',
                  textAlign: 'center',
                  border: '1px solid black',
                  padding: '2px',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
                onClick={deleteWord(i)}
              >
                <Box>{i}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {shufleMnemonic.map((i) => {
          return (
            <Box
              key={i}
              sx={{
                flex: '0 0 20%',
                textAlign: 'center',
                border: '1px solid black',
                padding: '2px',
                borderRadius: '5px',
                fontSize: '14px',
                background: selectedWords.includes(i) ? '#42a5f5' : '',
              }}
              onClick={addWord(i)}
            >
              {i}
            </Box>
          );
        })}
      </Box>
      <Button
        variant="contained"
        disabled={disabledBtn}
        sx={{ marginTop: '10px' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};