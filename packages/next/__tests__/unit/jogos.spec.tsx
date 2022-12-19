/// <reference types="node" />
import { updateExistencePoints } from '@ct-ordo-realitas/app/firebase/jogos/sessoes/removeExistencePoints';
import { Session } from '@ct-ordo-realitas/app/firebase/jogos/sessoes/Session';

const spy = jest.spyOn(global.Math, 'random');

describe('Rituals API', () => {
  const session: Session = {
    coffins: [
      {
        selected: false,
        player: 'a',
      },
      {
        selected: false,
        player: 'b',
      },
      ...Array(10).fill({
        selected: false,
      }),
    ],
    devil: 'a',
    players: {
      a: {
        name: 'joao',
        existencePoints: 6,
      },
      b: {
        name: 'jasmine',
        existencePoints: 6,
      },
      c: {
        name: 'pedro',
        existencePoints: 6,
      },
      d: {
        name: 'Ana',
        existencePoints: 6,
      },
      e: {
        name: 'Julia',
        existencePoints: 6,
      },
    },
    targets: 6,
  };
  it('decreases existence points "randomly" if selected targets\'s property is undefined', () => {
    spy.mockReturnValue(0);
    const players = Object.values(updateExistencePoints(session).players);
    players.forEach(({ existencePoints, name }) => {
      if (name === session.players[session.devil].name) {
        expect(existencePoints).toBe(6);
      } else {
        expect(existencePoints).toBe(5);
      }
    });

    spy.mockReturnValue(0.9);
    const unscathedPlayers = Object.values(updateExistencePoints(session).players);
    unscathedPlayers.forEach(({ existencePoints }) => expect(existencePoints).toBe(6));
  });
  it('decreases existence points from selected targets', () => {
    spy.mockReturnValue(0);
    const newSession = { ...session };
    const unscathedPlayers = Object.values(updateExistencePoints(newSession).players);
    unscathedPlayers.forEach(({ existencePoints }) => expect(existencePoints).toBe(6));
  });
});
