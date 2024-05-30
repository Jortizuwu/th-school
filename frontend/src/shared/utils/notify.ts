import toast from 'react-hot-toast';

type hola = 'error' | 'ld' | null | undefined;

export const Notify = (msg: string, type: hola) => {
  if (type === 'error') {
    return toast.error(msg, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        backgroundColor: '#ff7782',
        color: 'white',
      },
      className: 'text-white font-bold',
    });
  }
  if (type === 'ld') {
    return toast.loading('loading...', {
      duration: 3000,
      position: 'bottom-center',
      className: 'text-white font-bold',
    });
  }
  return toast.success(msg, {
    duration: 3000,
    position: 'bottom-center',
    style: {
      backgroundColor: '#41f1b6',
      color: 'white',
    },
    className: 'text-white font-bold',
  });
};
