import List from 'base/data-structure/list/List';

/**
 * Represents playback queue.
 * Based on list data structure
 */
class PlaybackQueue {
    ahead: List<IAudioTrack>;
    current?: IListNode<IAudioTrack>;
    behind: List<IAudioTrack>;

    constructor() {
        this.ahead = new List();
        this.behind = new List();
    }

    /** Restores playback queue state. Backs to the begin of the queue */
    restore() {
        if (this.current) {
            this.ahead.insertBefore(this.ahead.front, this.current);
        }
        if (this.behind.size) {
            this.ahead.mergeList(this.behind, false);
        }
    }

    setPositionNode(node: IListNode<IAudioTrack>) {
        this.restore();

        let res = this.ahead.splitList(node);
        if (!res) return;

        this.ahead = res.second;
        this.current = res.node;
        this.behind = res.first;
    }

    /** Clears playback queue */
    clear() {
        this.ahead.clear();
        this.behind.clear();

        delete this.current;
    }
}

export default PlaybackQueue;