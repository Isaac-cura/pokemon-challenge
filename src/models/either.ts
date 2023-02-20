abstract class EitherType<T>{
    constructor(protected value: T) { }
    abstract succeeded: boolean
    abstract failed: boolean
}

export class Success<T> extends EitherType<T> {
    succeeded = true as const;
    failed = false as const;
    result = this.value

    static create<T>(value?: T) {
        return new Success(value) as Success<T>
    }
    
    static filter<T, U>(arr: Either<T, U>[]): Success<U>[] {
        return arr
            .filter((i): i is Success<U> => i.succeeded)
    }

}

export class Failure<T> extends EitherType<T>{
    succeeded = false as const;
    failed = true as const;
    error = this.value
    
    static create<T>(value?: T) {
        return new Failure(value) as Failure<T>
    }

    static filter<T, U>(arr: Either<T, U>[]): Failure<T>[] {
        return arr
            .filter((i): i is Failure<T> => i.failed)
    }
}

export type Either<T, U> = Failure<T> | Success<U>;

export type AsyncEither<T, U> = Promise<Either<T, U>>

