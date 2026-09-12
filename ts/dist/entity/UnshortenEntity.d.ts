import { UnshortenmeEntityBase } from '../UnshortenmeEntityBase';
import type { UnshortenmeSDK } from '../UnshortenmeSDK';
import type { Control } from '../types';
import type { Unshorten, UnshortenLoadMatch } from '../UnshortenmeTypes';
declare class UnshortenEntity extends UnshortenmeEntityBase<Unshorten> {
    constructor(client: UnshortenmeSDK, entopts: any);
    make(this: UnshortenEntity): UnshortenEntity;
    load(this: any, reqmatch?: UnshortenLoadMatch, ctrl?: Control): Promise<UnshortenEntity>;
}
export { UnshortenEntity };
