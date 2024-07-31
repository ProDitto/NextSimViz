// import frames from './replay_data2'

const pre_processing = (frames) => {
  const data = []
  for (const frame of frames.data) {
    const f = {
      ball_pos: [frame.ball_pos[0] * 0.02, frame.ball_pos[2] * 0.02, frame.ball_pos[1] * 0.02],
    }
    const players = []
    for (const p of frame.player) {
      players.push({
        pos: [p.pos[0] * 0.02, p.pos[2] * 0.02, p.pos[1] * 0.02],
        rot: [p.rot[0], p.rot[2], p.rot[1]],
        idx: p.idx,
      })
    }
    f.player = players
    data.push(f)
  }

  return {
    n_players: data[0].player.length,
    data: data,
  }
}

export default pre_processing
