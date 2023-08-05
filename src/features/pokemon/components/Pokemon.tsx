import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FetchWrapper } from '../../../components/FetchWrapper';
import { Header } from '../../../components/Header';
import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';
import { formatName } from '../../../utils/string';

export const Pokemon: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
  const { t } = useTranslation('translation', { keyPrefix: 'pokemon' });
  return (
    <FetchWrapper isLoading={isLoading} isError={!!error}>
      {data && (
        <div>
          <Header title={formatName(data.name)} />
          {data.sprites.front_default && (
            <img src={data.sprites.front_default} className="w-[200px]" />
          )}
          {data.abilities && data.abilities.length && (
            <p>
              <span className="font-bold pr-2"> {t('abilities')}</span>{' '}
              {data.abilities
                .map((ability) => formatName(ability.ability.name))
                .join(', ')}
            </p>
          )}
          {data.moves && data.moves.length && (
            <p>
              <span className="font-bold pr-2">{t('moves')}</span>{' '}
              {data.moves.map((move) => formatName(move.move.name)).join(', ')}
            </p>
          )}
          {data.species && (
            <p>
              <span className="font-bold pr-2">{t('spieces')}</span>
              {formatName(data.species.name)}
            </p>
          )}
        </div>
      )}
    </FetchWrapper>
  );
};
