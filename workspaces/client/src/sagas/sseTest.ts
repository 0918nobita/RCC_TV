import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { Observable } from 'rxjs';

import { LiveActionTypes, onMessage, fail } from '@/store/live/actions';

export function* sseTest() {
  yield take(LiveActionTypes.Start);

  const sseChannel = eventChannel<string>(emit => {
    const receive$ = new Observable<string>(observer => {
      const evtSource = new EventSource('http://localhost:8080/live');
      evtSource.onmessage = x => observer.next(x.data);
      return () => evtSource.close();
    });
    return receive$.subscribe(x => emit(x)).unsubscribe;
  });

  while (true) {
    const count: number = yield take(sseChannel);
    yield put(onMessage(count));
  }
}
