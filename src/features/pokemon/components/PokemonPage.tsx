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

const useEvolutionChain = (url: string | null | undefined) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
    null,
  );

  // possible better to move to redux/saga
  useEffect(() => {
    if (url) {
      ky(url)
        .then((res) => res.json())
        .then((res) => {
          return ky((res as PokemonSpecies).evolution_chain.url);
        })
        .then((res) => res.json())
        .then((res) => {
          setEvolutionChain(res as EvolutionChain);
        });
    }
  }, [url]);
  return evolutionChain;
};

export const PokemonPage: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
  const { t } = useTranslation('translation', { keyPrefix: 'pokemon' });

  const evolutionChain = useEvolutionChain(data?.species?.url);

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
          <div className="flex justify-between">
            <Header title={formatName(data.name)} align="left" />
            <Link to={'/'}>
              <Button title={t('back')} />
            </Link>
          </div>
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2 lg:w-1/3 aspect-square">
              {data.sprites.front_default && (
                <img
                  src={data.sprites.front_default}
                  className="resize object-contain w-full flex-1"
                  alt={`Default front image of ${data.name}`}
                />
              )}
            </div>
            <div className="flex-1">
              {data.abilities && data.abilities.length ? (
                <p>
                  <span className="font-bold pr-2"> {t('abilities')}</span>{' '}
                  {data.abilities
                    .map((ability) => formatName(ability.ability.name))
                    .join(', ')}
                </p>
              ) : null}
              {data.moves && data.moves.length ? (
                <p>
                  <span className="font-bold pr-2">{t('moves')}</span>{' '}
                  {data.moves
                    .map((move) => formatName(move.move.name))
                    .join(', ')}
                </p>
              ) : null}
              {data.species && (
                <p>
                  <span className="font-bold pr-2">{t('spieces')}</span>
                  {formatName(data.species.name)}
                </p>
              )}
              {data.sprites && (
                <div>
                  <span className="font-bold pr-2">{t('sprites')}</span>
                  <div className="flex flex-wrap">
                    {Object.values(data.sprites).map((item) => {
                      // just a dumb list of basic sprites
                      if (typeof item === 'string') {
                        return <img key={item} src={item} />;
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {plainEvolutionChain && (
            <div>
              <span className="font-bold pr-2">{t('evolution')}</span>
              <div className={'flex flex-wrap'}>
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
