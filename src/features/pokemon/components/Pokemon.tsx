import ky from 'ky';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../../components/Button';
import { FetchWrapper } from '../../../components/FetchWrapper';
import { Header } from '../../../components/Header';
import { useGetPokemonByNameQuery } from '../../../services/pokemonApi';
import type {
  ChainLink,
  EvolutionChain,
  NamedAPIResource,
  PokemonSpecies,
} from '../../../utils/models';
import { formatName } from '../../../utils/string';
import { PokemonListItem } from '../../pokemons/components/PokemonListItem';

export const recursivelyExtractEvolutionChain = (
  chain: ChainLink,
): NamedAPIResource[] => {
  let res: NamedAPIResource[] = [chain.species];
  for (const curChain of chain.evolves_to) {
    res = [...res, ...recursivelyExtractEvolutionChain(curChain)];
  }
  return res;
};
export const Pokemon: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
  const { t } = useTranslation('translation', { keyPrefix: 'pokemon' });
  // const [spieces, setSpieces] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null,
  );

  // it's better to put it into the Redux/Saga
  useEffect(() => {
    if (!isLoading && !error && data) {
      ky(data.species.url)
        .then((res) => res.json())
        .then((res) => {
          // setSpieces(res as PokemonSpecies);
          return ky((res as PokemonSpecies).evolution_chain.url);
        })
        .then((res) => res.json())
        .then((res) => {
          setEvolutionChain(res as EvolutionChain);
        });
    }
  }, [isLoading, error, data]);

  const plainEvolutionChain = useMemo(() => {
    if (!evolutionChain) {
      return [];
    }

    return recursivelyExtractEvolutionChain(evolutionChain.chain);
  }, [evolutionChain]);

  return (
    <FetchWrapper isLoading={isLoading} isError={!!error}>
      {data && (
        <div>
          <Header title={formatName(data.name)} />
          <Link to={'/'}>
            <Button title={t('back')} />
          </Link>
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
          {data.sprites && (
            <div>
              <span className="font-bold pr-2">{t('sprites')}</span>
              <div className="flex">
                {Object.values(data.sprites).map((item) => {
                  // just a dumb list of basic sprites
                  if (typeof item === 'string') {
                    return <img key={item} src={item} />;
                  }
                })}
              </div>
            </div>
          )}
          {plainEvolutionChain && (
            <div>
              <span className="font-bold pr-2">{t('evolution')}</span>
              <div className={'flex'}>
                {plainEvolutionChain.map((item) => (
                  <PokemonListItem key={item.name} name={item.name} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </FetchWrapper>
  );
};
