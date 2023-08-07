import ky from 'ky';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
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

import { PokemonPanel } from './PokemonPanel';

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

  const formattedName = data ? formatName(data?.name) : '';

  return (
    <FetchWrapper isLoading={isLoading} isError={!!error}>
      {data && (
        <div>
          <Helmet>
            <title>Pokedex - {formattedName}</title>
          </Helmet>
          <div className="flex justify-between">
            <Header title={formattedName} align="left" />
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
              <PokemonPanel
                isVisible={Boolean(data.abilities && data.abilities.length)}
                title={t('abilities')}
              >
                {data.abilities
                  .map((ability) => formatName(ability.ability.name))
                  .join(', ')}
              </PokemonPanel>
              <PokemonPanel
                isVisible={Boolean(data.moves && data.moves.length)}
                title={t('moves')}
              >
                {data.moves
                  .map((move) => formatName(move.move.name))
                  .join(', ')}
              </PokemonPanel>
              <PokemonPanel
                isVisible={Boolean(data.species)}
                title={t('spieces')}
              >
                {formatName(data.species.name)}
              </PokemonPanel>
              <PokemonPanel
                isVisible={Boolean(data.sprites)}
                title={t('sprites')}
              >
                <div className="flex flex-wrap">
                  {Object.values(data.sprites).map((item) => {
                    // just a dumb list of basic sprites
                    if (typeof item === 'string') {
                      return <img key={item} src={item} />;
                    }
                  })}
                </div>
              </PokemonPanel>

              <PokemonPanel
                isVisible={Boolean(data.stats && data.stats.length)}
                title={t('stats')}
              >
                <div className="grid grid-cols-2 gap-2">
                  {data.stats.map((stat) => (
                    <>
                      <div key={stat.stat.name}>
                        {formatName(stat.stat.name)}:
                      </div>
                      <div>
                        <progress
                          max={100}
                          value={stat.base_stat}
                          className="rounded-lg overflow-hidden"
                        />
                      </div>
                    </>
                  ))}
                </div>
              </PokemonPanel>
            </div>
          </div>

          <PokemonPanel
            isVisible={Boolean(
              plainEvolutionChain && plainEvolutionChain.length,
            )}
            title={t('evolution')}
          >
            <div className={'flex flex-wrap'}>
              {plainEvolutionChain.map((item) => (
                <PokemonListItem key={item.name} name={item.name} />
              ))}
            </div>
          </PokemonPanel>
        </div>
      )}
    </FetchWrapper>
  );
};
