const { ignoreElements, switchMap, tap } = require('rxjs/operators')

const { INITIALIZE_STATE, NODE_SCANNING_COMPLETE } = require('./actions')
const { ofType } = require('./reduxObservable')

const timeTrackerEpic = (
	action$,
	state$,
) => (
	action$
	.pipe(
		ofType(INITIALIZE_STATE),
		tap(() => {
			console
			.time('Redux-Observable Concurrent')
		}),
		switchMap(() => (
			action$
			.pipe(
				ofType(NODE_SCANNING_COMPLETE),
			)
		)),
		tap(() => {
			console
			.timeEnd('Redux-Observable Concurrent')
		}),
		tap(() => {
			console
			.log(
				(
					'count'
				),
				(
					state$
					.value
					.largestContiguousIds
					.size
				),
			)
		}),
		ignoreElements(),
	)
)

module.exports = timeTrackerEpic
