# Jest mock extension

## Install

If you are using Jest 23 or lower, please install jest-extension `0.23.x`, otherwise, `0.24.x`.

## Mock a class

This would be useful in `Angular` and `NestJS` testing.

### Plain class testing:
```
const SampleServiceMockClass: Type<ClassMock<SampleService>> = mockClass(SampleService);
const sampleServiceMock: ClassMock<SampleService> = new SampleServiceMockClass();
```

### Angular testing:
```
let cookieService: ClassMock<CookieService>;

beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TrackingIdService,
        {
          provide: CookieService,
          useClass: mockClass(CookieService)
        }
      ]
    });
    cookieService = TestBed.get(CookieService);
});
```

### NestJS testing:
```
let module: TestingModule;
let loggerService: ClassMock<LoggerService>;

beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [],
      providers: [
        ConfigService,
        {
          provide: LoggerService,
          useClass: mockClass(LoggerService),
        },
      ],
    }).compile();

    loggerService = module.get(LoggerService);
});
```
