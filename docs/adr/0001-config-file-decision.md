# 1. Config File Decision

Date: 2019-08-23

## Status

2019-08-23 proposed

## Context

As a Architecture Guard, we need to setup a rule for file place directory

## Decision

Example Config:

```
language: TypeScript
suffix: [ts, js, dart]
FileNamingStyle: camel | dash | underline 
fileTree:
 - src
   - types: ['*.model.ts', '*.d.ts]
   - components: '*.component.*'
   - shared:
```

tree Rule:

 - directory - fileName - fileClass 

## Consequences

Consequences here...
