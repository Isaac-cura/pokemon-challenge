abstract class EitherType<T>{
    constructor(protected value?: T) { }
    abstract succeeded: boolean
    abstract failed: boolean
}

export class Success<T> extends EitherType<T> {
    succeeded: true = true;
    failed: false = false;
    result = this.value

    static create<T>(value?: T) {
        return new Success(value)
    }

}

export class Failure<T> extends EitherType<T>{
    succeeded: false = false;
    failed: true = true;
    error = this.value
     
    static create<T>(value?: T) {
        return new Failure(value)
    }
}

export type Either<T, U> = NonNullable<Failure<T> | Success<U>>;

