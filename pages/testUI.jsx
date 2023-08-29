import 'tailwindcss/tailwind.css';
import '@radix-ui/themes/styles.css';
import {
  Theme,
  Button,
  TextField,
  IconButton,
  Flex,
  TextArea,
} from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';

import { ImageIcon } from '@radix-ui/react-icons';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Test() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/curation?text=${encodeURIComponent(text)}`);
  };
  return (
    <div>
      <Head>
        <title>News Curation</title>
      </Head>
      <Theme>
        <h1>News Curation</h1>
        <textarea
          placeholder="What's happening?"
          className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        />
        <div className='flex items-center justify-between mt-4 ml-20 mr-20'>
          <TextField.Root>
            <TextField.Input
              radius='full'
              placeholder='Enter article URL'
              size='3'
              onChange={(event) => setText(event.target.value)}
            />
            <TextField.Slot>
              <button
                data-accent-color='gray'
                className='rt-reset-button rt-reset-a rt-BaseButton rt-Button rt-r-size-2 rt-variant-solid rt-high-contrast'
                type='submit'
                onClick={handleSubmit}
              >
                CLICK FOR THE FACTS
              </button>
            </TextField.Slot>
          </TextField.Root>

          <IconButton variant='solid' highContrast>
            <ImageIcon width='18' height='18' />
          </IconButton>
        </div>
      </Theme>
    </div>
  );
}

export default Test;
