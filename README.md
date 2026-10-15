# Tekenradar study and survey definitions

## Usage

### Prerequisites

- `node` and `npm` must be installed.

### Installation

- Checkout the git repository.

- To install dependencies run:

```sh
npm install
```

### Normal use

Edit the content for example inside `src/studies/infectieradar` as you wish.

To run the script to generate all the configuration files, you can use:

```sh
npm start study=<studyKey>
```

For example:

```sh
npm start study=infectieradar
```

The results will be generated inside the `output` folder.
The output folder is not tracked by git, so if you want to store intermediate results of the generated JSON files, you need to do it outside of this repository.

## Pienter swab invitations

Eligible participants first go through ordinary random selection. If not selected,
participants with `pienter_sample` receive the same swab invitation through the
Pienter fallback, without reserving or consuming random-sample quota.

The temporary participant flag `selfSwabbingPienterInvitationTime` stores the Unix
timestamp of a fallback invitation. Its presence tells the confirmation rule to
skip the sampler's reservation confirmation/cancellation call. Random invitations,
including those for Pienter cohort members, have no such flag and retain the
existing reservation flow. The `selfSwabbing` report records `selectionSource` as
`random` or `pienter`, while its `sampler` field preserves the random-selection
result.

The temporary flag is removed after an invitation response, on invitation expiry,
or when swabbing is stopped. Each weekly submission removes the previous fallback
invitation and its flag before making the new selection. A new fallback sets a
fresh timestamp. Cohort membership and its enrolment sequence remain unchanged.

Deploy the ordinary-selection version of the self-swabbing extension together
with these rules; the extension must not override random selection for Pienter.

## License

[Apache License 2.0](LICENSE)
