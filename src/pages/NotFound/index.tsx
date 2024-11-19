import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const { state } = useLocation();
  return (
    <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <span className="mb-4 text-9xl">404</span>
      <h1 className="mb-8">A página solicitada não foi encontrada.</h1>
      <h3>Possíveis motivos:</h3>
      <ul>
        <li className="font-bold text-red-500">
          {!state ? 'URL inválida' : <span>{state}</span>}
        </li>
      </ul>
    </div>
  );
};

export default NotFound;
