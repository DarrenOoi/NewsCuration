import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import BiasScore from '@/components/BiasScore';

function AnalysisPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };
  const highlight = true;

  return (
    <div>
      <Head>
        <title>Just The Facts</title>
      </Head>
      <Navbar />
      <div className='min-h-screen bg-[#5F7A95]'>
        <div className='hero'>
          <div className='hero-content p'>
            <div>
              <div className='flex justify-start'>
                <Button handleClick={handleClick} text='BACK TO THE FACTS' />
              </div>
              <div className='mt-10'>
                <Card
                  title='Lorem Ipsum'
                  highlight={highlight}
                  content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor sit amet odio vel blandit. Morbi vestibulum pellentesque sapien, ut cursus massa pharetra eu. Nullam tincidunt eget ipsum ac finibus. Integer mollis sem lectus, eu ultrices ipsum luctus ac. Mauris dignissim eros non semper viverra. Curabitur rutrum sagittis porta. Curabitur ultrices libero non feugiat luctus. Nulla eget elementum nisl. Proin aliquet eleifend metus ac elementum. Donec vitae pharetra orci. Proin varius sit amet felis sed varius. Morbi a posuere mi. Ut nibh erat, faucibus sit amet condimentum non, blandit ac magna. Praesent pulvinar pharetra eros vitae congue. Sed fermentum massa sit amet iaculis egestas.

Vivamus neque erat, vehicula eget enim vel, eleifend fermentum arcu. Duis volutpat nec magna vel consectetur. Phasellus lectus nunc, tempor ut nibh vel, aliquam bibendum elit. Cras varius lorem non elit rhoncus laoreet. Integer consequat arcu eget rhoncus laoreet. Mauris in risus accumsan, molestie mauris non, varius odio. Etiam maximus nisi aliquet placerat fringilla. Fusce sollicitudin imperdiet purus, et eleifend orci pellentesque ut. Praesent eget interdum nibh. Sed vehicula eros magna, vel imperdiet risus pellentesque sed. Sed cursus mi a eros faucibus, sit amet lobortis erat tincidunt. Cras libero est, iaculis vel urna sed, rutrum congue tellus. Nulla sed elit sed urna elementum interdum non non sem.

Fusce quis molestie est. In commodo quam et dictum faucibus. Mauris pretium lacus sapien. Donec vel ante elementum, consectetur dolor at, facilisis enim. Mauris efficitur egestas elit eu sollicitudin. Aenean id dui elit. Mauris faucibus lectus non mattis tristique. Pellentesque ligula leo, pellentesque ut sollicitudin accumsan, vehicula at urna. Praesent lobortis, mauris quis tristique volutpat, diam urna interdum quam, id rutrum libero leo nec turpis.

Morbi eget diam et metus consectetur facilisis eget id sem. Praesent id ipsum nisi. Maecenas volutpat, massa ut eleifend pharetra, urna leo eleifend nibh, ac tempor nunc mauris at eros. Nam venenatis faucibus nunc quis tempus. Nulla facilisi. Aenean commodo aliquet tortor eu convallis. Donec ac eros non tortor hendrerit mollis sed maximus quam. Aenean efficitur massa non risus fermentum ornare. Suspendisse potenti. Proin id libero arcu. Vestibulum faucibus sed metus eu finibus. Integer nunc nunc, elementum a consectetur sodales, fringilla at turpis. Nam scelerisque in augue at varius. Sed vestibulum massa in tempor volutpat. Quisque blandit lacus vel massa elementum, nec scelerisque leo feugiat. Etiam cursus semper dui eget sollicitudin.'
                />
              </div>
              <BiasScore score='60%' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
