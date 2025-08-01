import { workerData as benchmark, parentPort } from 'worker_threads'
import pkg from 'benchmark'
import FindMyWay from '../index.js'
const { options, Suite } = pkg

// The default number of samples for Benchmark seems to be low enough that it
// can generate results with significant variance (~2%) for this benchmark
// suite. This makes it sometimes a bit confusing to actually evaluate impact of
// changes on performance. Setting the minimum of samples to 500 results in
// significantly lower variance on my local setup for this tests suite, and
// gives me higher confidence in benchmark results.
options.minSamples = 500

const suite = Suite()
const findMyWay = new FindMyWay()

for (const { method, url, opts } of benchmark.setupURLs) {
  if (opts !== undefined) {
    findMyWay.on(method, url, opts, () => true)
  } else {
    findMyWay.on(method, url, () => true)
  }
}

suite
  .add(benchmark.name, () => {
    findMyWay.lookup(...benchmark.arguments)
  })
  .on('cycle', (event) => {
    parentPort.postMessage(String(event.target))
  })
  .on('complete', () => { })
  .run()
