
import React, { memo } from 'react';
import { VedicCompatibilityDashboard } from './vedic-compatibility-dashboard';
import { VirtualCeremonyServices } from './virtual-ceremony-services';
import { SpiritualLearningModules } from './spiritual-learning-modules';
import { CommunityChapters } from './community-chapters';

const SpiritualDashboard = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sandalwood/10 to-white">
      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Dashboard Header */}
        <div className="text-center">
          <h1 className="text-5xl font-crimson font-bold text-indigo-night mb-4">
            🕉️ Spiritual Journey Dashboard
          </h1>
          <p className="text-xl text-indigo-night/70 max-w-3xl mx-auto">
            Your comprehensive guide to dharmic relationships, Vedic compatibility, and spiritual growth
          </p>
        </div>

        {/* Vedic Compatibility Dashboard */}
        <section>
          <VedicCompatibilityDashboard />
        </section>

        {/* Virtual Ceremony Services */}
        <section>
          <VirtualCeremonyServices />
        </section>

        {/* Spiritual Learning Modules */}
        <section>
          <SpiritualLearningModules />
        </section>

        {/* Community Chapters */}
        <section>
          <CommunityChapters />
        </section>
      </div>
    </div>
  );
});

SpiritualDashboard.displayName = 'SpiritualDashboard';

export { SpiritualDashboard };
