import {Construct} from "@aws-cdk/core";

import {EnvConstructProps} from '../../../types'
import {CiEntrypoint} from './ciEntrypoint';
import {CiPipeline} from "./ciPipeline";
import {GlobalResources} from "../resources";

export interface GlobalCiProps extends EnvConstructProps {
    resources: GlobalResources;
}

export class GlobalCi extends Construct {
    ciEntrypoint: CiEntrypoint;
    ciPipeline: CiPipeline;

    constructor(scope: Construct, id: string, props: GlobalCiProps) {
        super(scope, id);

        this.ciEntrypoint = new CiEntrypoint(this, 'Entrypoint', {
            envSettings: props.envSettings,
            codeRepository: props.resources.codeCommit.repository,
        });

        this.ciPipeline = new CiPipeline(this, "CiPipeline", {
            envSettings: props.envSettings,
            entrypointArtifactBucket: this.ciEntrypoint.artifactsBucket,
            resources: props.resources,
        });
    }
}