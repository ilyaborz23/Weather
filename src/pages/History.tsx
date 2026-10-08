import { useState } from 'react'
import type { HistoryItem } from '../types'
import { getHistory, clearHistory } from '../history'

function History() {
  const [history, setHistory] = useState<HistoryItem[]>(getHistory())

  function handleClear() {
    clearHistory()
    setHistory([])
  }

  return (
    <div>
      <h2>Search History</h2>

      {history.length === 0 ? (
        <p>No searches yet.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Locality</th>
                <th>Temperature</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>
                    {item.cityHe} ({item.cityEn})
                  </td>
                  <td>{item.tempC}°C</td>
                  <td>{item.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleClear}>Clear history</button>
        </>
      )}
    </div>
  )
}

export default History
